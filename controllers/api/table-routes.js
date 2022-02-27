const router = require('express').Router();
const Table = require("../../models/Table");
const User = require("../../models/User");
const { v1: uuidv1 } = require('uuid');


// Get all table
router.get('/', (req, res) => {
    Table.findAll()
        .then(dbTableData => res.json(dbTableData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get specific table
router.get('/:id', (req, res) => {
    Table.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: User,
            attributes: ['id', 'username']
        }
        ]
    })
        .then(dbTableData => {
            if (!dbTableData) {
                res.status(404).json({
                    message: 'No table found with this id'
                });
                return;
            }
            res.json(dbTableData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a table
router.post('/', (req, res) => {

    let dm_id = req.body.dm

    User.findOne({where:{id:dm_id}}).then(
        dbUser=>{
            if(dbUser){
                Table.create({
                    id: uuidv1(),
                    dm: dm_id,
                    noPlayers: req.body.noPlayers,

                })
                    .then(dbTableData => {
                        req.session.save(() => {

                            res.json(dbTableData)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json(err)
                    })
            }
            else{
                res.json("Invalid User")
            }
        }
    )




})

router.post('/:tableID/player',(req,res)=>{
    let tableID = req.params.tableID
    let userID = req.body.id
    User.findOne({where:{id:userID}}).
    then(dbUser=>{
        if(dbUser){
            Table.findOne({where:{id:tableID}}).then(dbTable=>{
                if(dbTable){
                    let players = JSON.parse(dbTable.players)
                    let tableSize = dbTable.noPlayers

                        if(!players){
                            players = [userID]
                        }
                        else if(players.length<tableSize){
                            if(players.includes(userID)){
                                res.json("User Already on Table")
                                return
                            }
                            else{
                                if(!req.body.guest){
                                    players.push(userID)
                                }
                                else if(req.body.guest+1+players.length<=tableSize){
                                    players.push(userID)
                                    for(let i=0;i<req.body.guest;i++){
                                        players.push(userID+"_guest_"+i+1)
                                    }
                                }
                                else{
                                    res.json("Too many Guests")
                                    return
                                }


                            }
                        }
                        else{
                            res.json("Full Table");
                            return
                        }


                    Table.update({players:players},{where:{id:tableID}}).then(dbUpdate=>{res.json(dbUpdate)})

                }
                else{
                    res.json("Invalid Table Id")
                }
                }
            )
        }
        else{
            res.json("Invalid User Id")
            console.log("no no")
            console.log(dbUser)
        }
    })


})

module.exports = router