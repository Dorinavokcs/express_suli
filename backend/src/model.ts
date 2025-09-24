import mysql, { type ResultSetHeader } from "mysql2/promise";

// Adatbázis-kapcsolat (pool) létrehozása:

const pool = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: "",
    database: "userdb"
});

// A felhasználó típusát deklaráljuk:
export interface User {
    id: number;
    nev: string;
    cim: string;
    szuletesiDatum: string | null;
};

// Összes felhasználó lekérése:
export const getUsers = async () => {
    const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT * FROM users");
    return rows;
}

export const createUser = async (user: Omit<User, "id">) => {
    const [result] = await pool.query<mysql.ResultSetHeader>("INSERT INTO users (nev, cim, szuletesiDatum) VALUES (?,?,?)",
        [user.nev, user.cim, user.szuletesiDatum]);

    const insertedId = result.insertId;
    return { ...user, id: insertedId };
}

export const removeUser = async (id: number) => {
    const [result] = await pool.query<mysql.ResultSetHeader>("DELETE FROM users WHERE id=?", [id]);

    return result.affectedRows > 0;
}

export const modifiedUser = async (id: number, user: Partial<User>) => {
    let currentUser;
    const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT * FROM users Where id = ?", [id]);
    if (rows.length > 0) {
        currentUser = rows[0] //user adatai objektumban
        console.log(currentUser, typeof currentUser);
    } else {
        return false;
    }
    const updatedUser = {
        id: id,
        nev: user.nev ?? currentUser!.nev,
        cim: user.cim ?? currentUser!.cim,
        szuletesiDatum: user.szuletesiDatum ?? currentUser!.szuletesiDatum
    }
    const [result] = await pool.query<mysql.ResultSetHeader>("UPDATE users SET nev = ?, cim = ?, szuletesiDatum = ? WHERE id = ?", [updatedUser.nev, updatedUser.cim, updatedUser.szuletesiDatum, id]);
    return result.affectedRows > 0;


}
export const getUsersById = async (id: number) => {
    const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT * FROM users Where id =?");
    return rows;
}

export const modifiedFullUser = async (uId: number, uData: User) => {
    let [result] = await pool.query<mysql.ResultSetHeader>("UPDATE users set nev=?, cim = ?, szuletesiDatum = ? WHERE id = ?", [uData.nev, uData.cim, uData.szuletesiDatum, uId]);
    if (result.affectedRows === 0){
        [result] = await pool.query<mysql.ResultSetHeader>("INSERT INTO user( nev, cim, szuletesiDatum) VALUES (?,?,?)", [uData.nev, uData.cim, uData.szuletesiDatum]);
        return {...uData, id: result.insertId};
    }else return{...uData, id:uId}
}

export const findUsersBySearch = async (search:string)=>{
    if(!search){
        const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT * from useres")
        return rows
    }
    const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT * from users where cim like ?",[`${search}$`])
}