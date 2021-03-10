# Gerenciador de Arquivos
 Projeto feito com node, express-generator, formidable, fs e adicionando os arquivos no firebase.
 Crio as rota POST E DELETE com o express-generator, uso o ajax para fazer a conexão entre o javascript e o node;
 a rota POST eu adiciono os arquivos na pasta upload e mando para o banco de dados firebase, estou usando o realtime database então ao adicionar os arquivos no sistema  eles aparecem já na tela em tempo real.
 A rota DELETE serve para deletar os arquivos, primeiro eu vejo se o arquivo existe com o fs, uso a função fs.existsSync(path) vendo se o arquivo existe se o arquivo existir faço o fs.readFile e dou um res.status(200).end(files);
 O projeto está todo em javascript OO, o HTML E CSS foi eu que fiz também.

 
 Linguagens:HTML,CSS E JAVASCRIPT
 
 
 Frameworks: node,formidable, express-generator,fs,boostrap
 
 
 Tipos de Arquivos que podem ser insiridos no sistema:
 
 Imagens: PNG,JPG E JPEG;
 
 PDF;
 
 Arquivos WORD E POWERPOINT;
 
 Arquivos músicas e vídeos
 
 
 OBS:NÃO CONSEGUIR HOSPEDAR O PROJETO EM NENHUM LUGAR ENTÃO SE QUISER TESTAR PRECISA FAZER OS SEGUINTES PASSOS:
 
 É necessário ter o node instalado na sua máquina;
 
 1.Baixar o projeto
 
 2. Abra o prompt de comando
 
 3. entre na pasta app cd C:\Users\nomeDoSeuUsuario\GerenciadorArquivos\app

4. npm install express-generator --save

5. npm install formidable --save

6. npm install fs --save

7.npm install -g bower
 
 8. npm start
 
 9. no navegador localhost:3000

OBS:No momento o projeto não está responsivo mais eu já estou trabalhando nisso.
