//Load Lessons

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json => displayLesson(json.data));
};

const removeActive =() =>{
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach( (btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res)=>res.json())
    .then((data)=> 
    {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        // console.log(clickBtn);
        clickBtn.classList.add("active");
        displayLevelWord(data.data);
    });
}

const displayLevelWord = (words) =>{
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML="";
    if(words.length=== 0){
        // alert("no word detected");
        // return;
        wordContainer.innerHTML=`
        <div class="text-center col-span-full py-10 rounded-xl space-y-5">
        <p class="text-xl font-medium">Vocbolury not prepared</p>
        <h2 class="text-3xl font-bold">Next lesson e jao</h2>
      </div>
        `;
    }
    words.forEach((word) =>{
        const card = document.createElement("div");
            card.innerHTML=  `
            <div class="bg-white shadow-lg text-center py-15 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "not found"}</h2>
        <p class="font-semibold">Meaning/Prounce</p>
        <div class="font-bangla font-medium text-2xl"> ${word.meaning ? word.meaning : "not found"} / ${word.pronunciation ? word.pronunciation : "not found"}</div>

        <div class="flex justify-between items-center">
          <button onclick="my_modal_1.showModal()" class="btn bg-slate-300"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-slate-300"><i class="fa-solid fa-music"></i></button>
          
        </div>
      </div>
            `;
            wordContainer.append(card);
    });
}

const displayLesson =(lessons) => {
    // console.log(lessons);
    //get the element  & Empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    // get into every lessons
    for(let lesson of lessons){

        const btnDiv = document.createElement("div");
        btnDiv.innerHTML=`
        <button id ="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `;

        levelContainer.append(btnDiv);
    }

}


loadLessons();