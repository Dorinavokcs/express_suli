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
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
}

export const createUser = async (user: Omit<User, "id">) => {
    const [result] = await pool.query<mysql.ResultSetHeader>("INSERT INTO users (nev, cim, szuletesiDatum) VALUES (?,?,?)", 
        [user.nev, user.cim, user.szuletesiDatum]);

    const insertedId = result.insertId;
    return {...user, id: insertedId};
}