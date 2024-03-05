const express = require('express')
const app = express()
const router = express.Router();
const bcrypt = require('bcrypt');
const port = 3000
const Modelclass = require('./db/user_model.js');
const jwt = require('jsonwebtoken');
const verifyToken = require('./middleware/middleware.js');

app.use(express.json());


app.get('/',verifyToken, (req, res) => {
  res.send('Hello world!')
});


// user register 
app.post('/register',async (req,res)=>{

  data={
    nom:req.body.nom,
    prenom:req.body.prenom,
    age:req.body.age,
    sexe:req.body.sexe,
    email:req.body.email,
    tel:req.body.tel,
    password: await bcrypt.hash(req.body.password, 10)
  }

  let result = Modelclass.create(data);
    result.then( 
      function(value){
        console.log( value );
         res.json( value)})
    .catch( function(error){console.log( error )});


});
// login
app.post('/login',async (req,res)=>{

  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await Modelclass.findByEmail(email);

    console.log(user);
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    // creation du token
    const token = jwt.sign({ userId: user.id }, '4d2ca3f62175d126d49cf3eeed47d7e5', {
    expiresIn: '1h',
    });

    res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
}
  );



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});



