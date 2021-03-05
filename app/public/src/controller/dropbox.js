

class Gerenciador {

    constructor(){


        this.btnSendFile = document.getElementById('send-file');
        this.inputFile = document.getElementById('files');
        this.listarFiles = document.querySelector('.list-files');
        this.nameFile = document.getElementById('name-file');
        this.btnRename = document.getElementById('renomear');
        this.btnDeletar = document.getElementById('delete');
        this.btnNewFolder = document.getElementById('new-folder');
        this.btnMenu = document.getElementById('menu');
        this.asideRight = document.getElementById('right');
        this.navEl = document.getElementById('browser-location');
        this.currentFolder = ['Principal'];
        this.initEvents();
        this.connectFirebase();
        this.redFiles();
        this.newFolder();
        this.openFolder();
        this.EventsMenu();
        




    }

    
    getSelection(){
        return this.listarFiles.querySelectorAll('.selected');
    }


    connectFirebase(){
        var firebaseConfig = {
            apiKey: "AIzaSyCO4hO0NwTvKF6AOxkGEwpVyf0ygApHQfg",
            authDomain: "gerenciador-de-arquivos-7f0b5.firebaseapp.com",
            projectId: "gerenciador-de-arquivos-7f0b5",
            storageBucket: "gerenciador-de-arquivos-7f0b5.appspot.com",
            messagingSenderId: "704315162912",
            appId: "1:704315162912:web:ecee5097de2aae3ba8d745",
            measurementId: "G-4VQ9GCDHC6"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
          firebase.analytics();
        

    }


    /* METODOS PARA FAZER O UPLOAD NA PASTA E MANDAR PARA O FIREBASE*/

    getFirebase(path){

        if(!path) path = this.currentFolder.join('/') 

        //precisamos fazer isso para enviar arquivos para o firebase
        // e passando dos dados files no ref que é onde os arquivos estão;
        return firebase.database().ref(path);
    }

   
    redFiles(){

        this.lastFolder = this.currentFolder.join('/');

        this.getFirebase().on('value',snapHot=>{
            this.listarFiles.innerHTML = '';

            snapHot.forEach(item=>{
               let key = item.key;
               let files = item.val();

               if(files.type){

                this.listarFiles.appendChild(this.viewFiles(files,key));

               }


            })

        })
    }

    EventsMenu(){

        

        this.btnMenu.addEventListener('click',event=>{

            if(this.asideRight.classList.contains('show')){

                this.asideRight.classList.add('hide');
                this.asideRight.classList.remove('show');

            } else{

                this.asideRight.classList.remove('hide');
                this.asideRight.classList.add('show');
            }

        })

    }

    initEvents(){

        

        this.btnSendFile.addEventListener('click',event=>{

            this.inputFile.click();
            

        })

        this.inputFile.addEventListener('change',event=>{

            //pegando os dados do arquivo como nome, tamanho, type
           // console.log(event.target.files);
           this.uploadTask(event.target.files).then(response=>{

                response.forEach(resp=>{
                    
                    console.log(event.target.files);
                    //mandando para o fireabse com o this.getFirebase
                    this.getFirebase().push().set(resp.files['input-file']);


                })

           })

                


            
        })

    }



    //metodo para fazer o upload dos arquivos
    uploadTask(files){

      let promises = [];

        [...files].forEach(files=>{
            

                promises.push(new Promise((resolve,reject)=>{

                let ajax = new XMLHttpRequest();

                ajax.open('POST','upload');
                ajax.onload = event=>{
                    try {
                        resolve(JSON.parse(ajax.responseText));
                    } catch (error) {
                        reject(error);
                    }
                }

                let formData = new FormData();

                formData.append('input-file',files);

                ajax.send(formData);

            }));


        });

        return Promise.all(promises);

        

    }
    /*FIM DOS METODOS PARA FAZER O UPLOAD DE ARQUIVOS NA PASTA UPLOAD E MANDAR PARA O FIRABASE*/ 



    removeTask(){
        let promisesRemove = [];

        this.getSelection().forEach(li=>{

            let key = li.dataset.key;
            let files = JSON.parse(li.dataset.files);

           

            promisesRemove.push(new Promise((resolve,reject)=>{

                let ajax = new XMLHttpRequest();

                ajax.open('DELETE','files');
                ajax.onload = event=>{
                    try {
                        resolve(JSON.parse(ajax.responseText));
                    } catch (error) {
                        reject(error);
                    }
                }

                let formData = new FormData();

                formData.append('key',key);
                formData.append('path',files.path);

                ajax.send(formData);



            }))

        })

        return Promise.all(promisesRemove);
    }

    
    /* EVENTOS DE PEGAR O TIPO E INSIRINDO DINAMICAMENTE */
    pegarTipoFiles(files){

        switch(files.type){
            case 'folder':
                return `
                
                
                <div class="item">
                    <i style="color: var(--bs-gray);" class="fas fa-folder"></i>
                    <p style="color:var(--bs-primary)">${files.name}</p>
                </div><!--item-->
                
        
                `
            break;

            case 'application/pdf':
                return `
                
               
                <div class="item">
                    <i style="color: var(--bs-danger);" class="fas fa-file-pdf"></i>
                    <p style="color:var(--bs-primary)">${files.name}</p>

                </div><!--item-->
                
        
            
                `
            break;

            case 'image/png':
            case 'image/jpg':
            case 'image/jpeg':
                return `
        
               
                <div class="item">
                    <i style="color: var(--bs-primary);" class="far fa-image"></i>
                    <p style="color:var(--bs-primary)">${files.name}</p>
                </div><!--item-->
            
            
                `
            break;

            case 'audio/mp3':
            case 'audio/mpeg':
            case 'audio/ogg':
            case 'audio/mp2':
            case 'audio/aac':
            case 'audio/ac3':
                return `
             
                
                <div class="item">
                    <i style="color: var(--bs-purple);" class="fas fa-music"></i>
                    <p style="color:var(--bs-primary)">${files.name}</p>
                </div><!--item-->
         
            
                `
            break;

            case 'video/mp4':
            case 'video/quicktime':
                return `
              
                
                <div class="item">
                    <i style="color: var(--bs-warning);" class="fas fa-file-video"></i>
                    <p style="color:var(--bs-primary)">${files.name}</p>
                </div><!--item-->
            
            
                    
              
                `
            break;

            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return `

                <div class="item">
                    <i style="color:var(--bs-info)" class="fas fa-file-word"></i>
                    <p style="color:var(--bs-primary)">${files.name}</p>
                </div><!--item-->

                `
            break;
            
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                return `

                <div class="item">
                <i style="color:var(--bs-orange)" class="fas fa-file-powerpoint"></i>
                    <p style="color:var(--bs-primary)">${files.name}</p>
                </div><!--item-->

                `

        }

    }

    //precisamos dos dados do arquivo e da chave dele que esta registrado no firebase
    //evento para criar tags li dinamicamente
    //  e colocando na tela de usuario o tipo de arquivo
    viewFiles(files,key){

        let li = document.createElement('li');

        
        //console.log(li.dataset.key = key);
       // console.log(li.dataset.files = JSON.stringify(files));
       //aqui retorna a chave do item que esta no fireabase e todos os dados do arquivo
        li.dataset.key = key;
        //precisamos transformar em texto para poder fazer a edição depois
        li.dataset.files = JSON.stringify(files);

        li.innerHTML = `
            ${this.pegarTipoFiles(files)}
            

        `
        this.initsLi(li);

        return li;



    }

    /* FIM DOS METEDOS DE PEGAR O TIPO DE ARQUIVO E INSERIR DINAMICAMENTE */


    newFolder(){
        this.btnNewFolder.addEventListener('click',event=>{

            let folderName = prompt('Digite o nome da pasta:');

            if(folderName){
                this.getFirebase().push().set({
                    name: folderName,
                    type: 'folder',
                    path: this.currentFolder.join('/')
                })
            }



        })
    }

    renameAndDelete(){
        //fazendo a edição dos arquivos
        this.btnRename.addEventListener('click',event=>{

            let li = this.getSelection()[0];
            // precisamos fazer um parse para transformar em objeto denovo pq ele ta como string
            let files = JSON.parse(li.dataset.files);
            console.log(files);
            let inputRename = prompt('Digite um novo nome:',files.name);
            

            if(inputRename){
                
                files.name = inputRename;

                this.getFirebase().child(li.dataset.key).set(files);
                
            }

            this.btnDeletar.style.display = 'none';
            this.btnRename.style.display = 'none';

        })

        this.btnDeletar.addEventListener('click',event=>{

            this.removeTask().then(response=>{


                response.forEach(remove=>{

                    if(remove.campos.key){
                        this.getFirebase().child(remove.campos.key).remove();

                        



                    
                    }

                    this.btnDeletar.style.display = 'none';
                    this.btnRename.style.display = 'none';
                    

                })

                

            }).catch(erro=>{
                console.error(erro);
            })
                
            
            
        })

        switch(this.getSelection().length){
            case 0:
                this.btnDeletar.style.display = 'none';
                this.btnRename.style.display = 'none';
            break;
                
            case 1:
                this.btnRename.style.display = 'block';
                this.btnDeletar.style.display = 'block';
            break;

            case 2:
                this.btnDeletar.style.display = 'block';
                this.btnRename.style.display = 'none';
            break;

            default:
                this.btnDeletar.style.display = 'block';
                this.btnRename.style.display = 'none';
            break;
        }


       
    }

  
    openFolder(){

        if(this.lastFolder) this.getFirebase(this.lastFolder).off('value');

        this.renderNav();

        this.redFiles();
    }

    renderNav(){

        let nav = document.createElement('nav');   
        let pathFolder = [];

        for(let i = 0; i < this.currentFolder.length;i++){

            //conforme eu for passando entre as pastar quero pegar o nome da pasta

            let folder = this.currentFolder[i];
            let span = document.createElement('span');
            
            
            

            pathFolder.push(folder);
            
            if((i+1) === this.currentFolder.length) {

                //ultimo elemnto recebe o nome da pasta que estar
               
                span.innerHTML = folder;
                
            } else{

                //aqui é a navegação entra as pasta 
                //vai gerar um link  na pasta anterior
                span.className = 'item';
                span.innerHTML =`

                <span><a data-path="${pathFolder.join('/')}" href="">${folder}</a></span>
                <span> <i class="fas fa-chevron-right"></i> </span>
                <span></span>
                
            
                
                `
                
            }

            nav.appendChild(span);

            
        }

        this.navEl.innerHTML = nav.innerHTML;

        
        //evento para nagegar entre as pastas com os links;
        this.navEl.querySelectorAll('a').forEach(a=>{

            a.addEventListener('click',event=>{

                event.preventDefault();

                this.currentFolder = a.dataset.path.split('/');

                this.openFolder();

            })

        })

       
    }

    //metodo de eventos da li com o CTRL
    initsLi(li){

        li.addEventListener('click',event=>{

          if(!event.ctrlKey){
            this.listarFiles.querySelectorAll('li.selected').forEach(el=>{

                el.classList.remove('selected');

            })
            
          }

          
          li.classList.toggle('selected');

          this.renameAndDelete();

        })

        li.addEventListener('dblclick',event=>{

            let files = JSON.parse(li.dataset.files);

            switch(files.type){

                case 'folder':
                    this.currentFolder.push(files.name);
                    this.openFolder();

                break;

                default:
                    window.open('/files?path=' + files.path);
                break;

            }

            this.btnDeletar.style.display = 'none';
            this.btnRename.style.display = 'none';

        })
    }

}

