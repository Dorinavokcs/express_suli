import express, { response } from 'express';
import { createUser, getUsers, removeUser, modifiedUser, getUsersById, modifiedFullUser } from './model.js';

export const getAll = async (req: express.Request, res: express.Response) => {
    try {
        const data = await getUsers();
        res.status(200)
            .type("application/json")
            .send(data);
    }catch(error) {
        res.status(500).type("application/json").send({error: "Users request failed"});
    }
    
}

export const addUser = async (req: express.Request, res: express.Response) => {
    const newUser = req.body;
    try{
        const user = await createUser(newUser);
        res.status(201).type("application/json").send(user);
    } catch (error) {
        res.status(500).type("application/json").send({error: "Nem sikerült létrehozni az újn felhasználót!"});
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id!);
    const result = await removeUser(id);

    if(result) res.status(200).type("application/json").send({message: "Removed successfully"});
    else res.status(500).type("application/json").send({error: "Failed to remove"});
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    const updateUser = req.body;
    const id = parseInt(req.params.id!, 10);
    try{
        const result = await modifiedUser(id, updateUser);
        const response = result ? {message: "Successful operation"} : {error:"failed operation"}
        res.status(201).type("application/json").send(response);
    }catch(error) {
        res.status(500).type("application/json").send(response);
    }
}

export const getCurrentUser = async (req:express.Request, res:express.Response)=>{
    const getCurrentUser = req.body
    const id = parseInt(req.params.id!, 10)
    try{
       const users = await getUsersById(id)
       if(users.length===0)res.status(400).type("application/json").send({error:"A felhasznalo nem talalhato"})
       res.status(200).type("application/json").send(users)
    }catch(error){
        res.status(500).type("application/json").send({error:"Szerver hiba"})
    }
}

export const updateFullUser = async(req:express.Request, res:express.Response)=>{
    const data = req.body;
    console.log=(data)

    const id = Number(req.params.id);
    try{
        const result = await modifiedFullUser(id, data);
            return res.status(201).type("application").send({message:""})
    }catch(error){
        return res.status(500).type("application/json").send({message:"internal server error"})
    }
}

export const searchUsers = async (req.express.Request, res:express.Response )=>{
    try{
        const search = req.query.search ? String(req.query.search):"";
        const users = await findUsersBySearch(search)
        return response.
    }catch(error){

    }
}