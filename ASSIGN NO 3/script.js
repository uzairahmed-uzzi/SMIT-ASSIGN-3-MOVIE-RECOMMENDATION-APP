


const url="https://image.tmdb.org/t/p/w45";
(async()=>{
    const response=await fetch("https://raw.githubusercontent.com/uzairahmed-uzzi/SMIT-ASSIGN-3-MOVIE-RECOMMENDATION-APP/main/data.json");
    const result=await response.json();
    let genDropDown=document.getElementById("genre");
    let yearDropDown=document.getElementById("year");
    let langDropDown=document.getElementById("lang");
    let ratingDropDown=document.getElementById("rating");
    let films=document.getElementById("films");
    let genre=new Set();
    let year=new Set();
    let lang=new Set();
    let rating=new Set();

    await result.forEach(obj => {
        for(let i of obj['genres']){
            if (Array.isArray( obj['genres'])){
                genre.add(i);
            }    
        }
        year.add(obj.release_date.slice(0,4));
        lang.add(obj.original_language);
        rating.add(obj.vote_average);
    });
    for(let o of genre){
    genDropDown.innerHTML+=`<option value="${o}">${o}</option>`;
}
    for(let y of year){
        yearDropDown.innerHTML+=`<option value="${y}">${y}</option>`;
}
    for(let l of lang){
        langDropDown.innerHTML+=`<option value="${l}">${l}</option>`;
}
for(let r of rating){
    ratingDropDown.innerHTML+=`<option value="${r}">${r}</option>`;
}
const renderMovies=(obj)=>{
    films.innerHTML=`
        <div class="row">
          <div class="col">
            <h5>RANK</h5>
          </div>
          <div class="col-8">
            <h5>MOVIE</h5>
          </div>
          <div class="col">
            <h5>YEAR</h5>
          </div>
        </div>
        <div class="hrContainer"> <hr></div>
    `;
    let count=1;
    obj.forEach((o)=>{
        
        films.innerHTML+=`<div class="row">
        <div class="col">
          <p>${count}</p>
        </div>
        <div class="col-8">
        <a href="${o.homepage}"><img class="image" src="${url+o.poster_path}"></a><div style="display:inline-block;margin:0 0 0 2%;" class="para"> <p style="display:inline-block;color: skyblue;" > ${o.title}   </p>
          <p>${ [...o.genres]} .${o.runtime} Minutes</p></div>
        </div>
        <div class="col">
          <p>${o['release_date'].slice(0,4)}</p>
        </div>
        </div>
        <div class="hrContainer"> <hr></div>`;
        count++;
        if(count>=90){
            throw("");
        }
    })
}


setInterval( ()=>{
    let genVal= genDropDown.value;
    let langVal=langDropDown.value;
    let yearVal=yearDropDown.value;
    let ratingVal=ratingDropDown.value;
    let resQuery;
    if(genVal!="all"&&langVal!="all"&&yearVal!="all"&&ratingVal!="all"){
        resQuery=result.filter((obj)=>{
            if (obj['genres'].includes(genVal)&&obj['release_date'].slice(0,4).includes(yearVal)&&obj['original_language'].includes(langVal)&&String(obj['vote_average']).includes(String(ratingVal))){
                        return true;
               }    
        });
    }
    else if(genVal==="all"&&langVal==="all"&&yearVal==="all"&&ratingVal==="all"){
        resQuery=result;
    }
    else{
        resQuery=result.filter((obj)=>{
            if (obj['genres'].includes(genVal)||obj['release_date'].slice(0,4).includes(yearVal)||obj['original_language'].includes(langVal)||String(obj['vote_average']).includes(String(ratingVal))){
                        return true;
               }    
        });
    }
    renderMovies(resQuery);
},1000);

    await console.log(genre,year,lang);
})()
