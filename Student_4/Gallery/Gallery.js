        /*Javascript functions to enlarge the image along with appearing of description after clicking the thumbnail*/
        
        var enlargedImgArea = document.getElementById("enlargedImgArea");
        var enlargedImg = document.getElementById("enlargedImg");

        function openEnlargedImage(pic,desc){
            enlargedImgArea.style.display="flex"
            enlargedImg.src=pic;
            document.getElementById('description').innerHTML=desc;
        }
        function closeEnlargedImage(){
            enlargedImgArea.style.display="none";
        }


        /*Javascript function to change background color of the webpage*/
        //if conditions are used to input the background color to the function which is declared near the onclick function.
        
        function changeBgColor(color){
            if(color==="yellow"){
                document.body.style.background="linear-gradient(to left,#ffeaa7,#F79F1F,#fdcb6e)";
            }else if (color==="pink"){
                document.body.style.background="linear-gradient(to left,#fd79a8,#ED4C67,#e84393)";
            }else if(color==="purple"){
                document.body.style.background="linear-gradient(to left,#a29bfe,#5758BB,#a29bfe";
            }else if(color==="orange"){
                document.body.style.background="linear-gradient(to left,#fab1a0,#EE5A24,#e17055)";
            }else if(color==="original"){
                document.body.style.background="linear-gradient(to left,#3F5EFB,#ED4C67,#e84393)";
            }else if(color==="random"){
                document.body.style.background = 'rgb(' + Math.round(Math.random() * 255) +
            ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) +
            ',' + Math.round(Math.random() * 255) + ')'
            }
        }

        /*Javascript function to change font size of the description*/
        //if conditions are used to input the font size to the function which is declared near the onclick function.

        function changeTextSize(size){
            var textElement1 = document.getElementById("description");
            var textElement2 = document.getElementById("topic"); 
            if(size==="small"){
                textElement1.style.fontSize="12px";
                textElement2.style.fontSize="12px";
                
            }else if (size==="medium"){
                textElement1.style.fontSize="15px";
                textElement2.style.fontSize="15px";
                
            }else if(size==="large"){
                textElement1.style.fontSize="20px";
                textElement2.style.fontSize="20px";
                
            }
        }