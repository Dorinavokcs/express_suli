import express from 'express';
import { createUser, getUsers, modifiedUser, removeUser } from './model.js';

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
        res.status(500).type("application/json").send("Nem sikerült létrehozni az újn felhasználót!");
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id!);
    const result = await removeUser(id);

    if(result) res.status(200).type("application/json").send({message:"Removed"});
    else res.status(500).type("application/json").send({error:"Failed to remove"});
}

export const updateUser =async(req: express.Request, res:express.Response)=>{
    const updateUser = req.body;
        try{
            const user = await modifiedUser(id: Number, updateUser)
            res.status(201).type ("application/json").send(user)
        }catch(error){
            res.status(500).type("application/json").send("nem sikerult modositani")
        }
}