var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/*
  criando a rota post atraves do /upload
  instancionando o objeto new formidables e chamando o formulario com o IncomingFrom e criando um objeto
*/

router.post('/upload',(req,res)=>{


  let form = formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions:true
  });


    form.parse(req,(error,campos,files)=>{
      res.json({
        files
      })
    })  

})


router.get('/files',(req,res)=>{

  let path = './'+ req.query.path;

  if(fs.existsSync(path)){

      fs.readFile(path,(erro,files)=>{

        if(erro){
          console.error(erro);
          res.status(400).json({
            error:erro
          })
        } else{

          res.status(200).end(files);

        }

      })

  } else{
    res.status(404).json({
      error: 'Arquivo não encontrado.'
    })
  }

})

router.delete('/files',(req,res)=>{

    let form =  formidable.IncomingForm({
      uploadDir: './upload',
      keepExtensions:true
    })


    form.parse(req,(error,campos,files)=>{

      let path = './'+campos.path;
      
      if(fs.existsSync(path)){
        fs.unlink(path,erro=>{
          res.status(400).json({
            erro
          })
        })
      } else{
        res.json({
          campos
        });
      }

    })

})










module.exports = router;
