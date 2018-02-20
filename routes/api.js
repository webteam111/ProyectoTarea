var config = require('../Configuracion/basededatos');
var jwt = require('jsonwebtoken');
var User = require('../models/registro');
module.exports = (router) =>{

    router.post('/register',(req,res)=>{
       let user = new User();
       if (!req.body.email) {
           res.json({success: false, message: 'Favor de proporcionar un email'})
       } else {
            user.Email = req.body.email;
            user.Nombre = req.body.name;
            user.Contraseña = req.body.password;
            user.save((err)=>{
                if (err) {
                    if (err.code == 11000) {
                    res.json({success: false, message: 'Email ya registrado'})
                    } else {
                    res.json({success: false, message: err})
                    }
                } else {
                    res.json({success: true, message: 'Usuario Guardado'})
                }
            })
        }
    })
    
    router.post('/login',(req,res)=>{
        if (!req.body.email) {
            res.json({success: false, message: 'Ingresar un email'})
        } else if(!req.body.password) {
            res.json({success: false, message: 'Ingresar una contraseña'})
        } else{
            User.findOne({Email: req.body.email},(err,user)=>{
                if (err) {
                    res.json({success: false, message: err})
                } else {
                    if (!user) {
                        res.json({success: false, message: 'Usuario no encontrado'})
                    } else {
                        const validPassword = user.comparePass(req.body.password);
                        if (!validPassword) {
                            res.json({success: false, message: 'Contraseña incorrecta'})
                        } else {
                            const token = jwt.sign({userId : user._id}, config.secret,{expiresIn: '24h'});
                            res.json({success: true, message: 'Usuario autenticado', token: token})
                        }
                    }
                }
            })
        }
    })

    
	router.use((req,res,next)=>{
        const token = req.headers['autorizacion'];
        if (!token) {
          res.json({succes: false, message:'Token requerido'})
        } else {
          jwt.verify(token, config.secret, (err, decoded) =>{
            if (err) {
              res.json({succes: false, message: 'Token invalido' + err})
            } else {
              req.decoded = decoded;
              next();
            }
          })
        }
      });

      router.get('/getProfile', (req,res)=>{
          User.findOne({_id: req.decoded.userId}, (err,user)=>{
         if (err) {
              res.json({succes: false, message: err})
          }
          else
          {
              res.json({succes:true, message: user})
          }
        })
    })

    router.put('/registerClient', (req,res)=>{
    User.update({_id: req.decoded.userId}, {$push: {'client': { 
        'Nombre': req.body.Nombre,
        'Apellido': req.body.Apellido,
        'Edad': req.body.Edad,
        'Sexo': req.body.Sexo,
        'Usuario': req.body.Usuario,
        'Email': req.body.Email,
        'Contraseña': req.body.Contraseña

    }}}, (err,user)=>{
           if (err) {
             res.json({succes: false, message: err})
         } else{
             res.json({succes:true, message: 'Campos actualizados'})
         }
                
       })
   })
      


    return router
}   