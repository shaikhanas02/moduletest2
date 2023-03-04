addbtn = document.getElementById("addbtn"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
closeIcon = popupBox.querySelector("header i"),
Publish = document.querySelector(".Publish") ,
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
Cancel = document.querySelector(".Cancel") ,
//Delete = document.querySelector(".Delete") ,
addBox = document.querySelector(".add-box");


//Delete.addEventListener('click', deleteNote) ;

addbtn.addEventListener("click", () => {
    popupTitle.innerText = "Add a new Note";
    Publish.innerText = "Publish Post";
    Cancel.innerText = "Cancel Post";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if(window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});
Cancel.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}
function updateNote(noteId, title, filterDesc) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId = noteId;
    isUpdate = true;
 addbtn.click();
    titleTag.value = title;
    descTag.value = description;
    popupTitle.innerText = "Update a Note";
    Publish.innerText = "Save Post";
   if( Cancel.innerText = "Delete Post" ){
    Cancel.addEventListener('click',deleteNote);
   }
}

function showNotes() {
    if(!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note, id) => {
        let filterDesc = note.description.replaceAll("\n", '<br/>');
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span> 
                            <div class='bottom-content'>
                            <div class="menu">
                                    <button onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit Post</button>
                                    <button onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete Post</button>
                                </div>
                            <span>${note.date}</span> 
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();
Publish.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value,
    description = descTag.value ;

    if(title || description) {
        let currentDate = new Date(),
        month = currentDate.getMonth(),
        day = currentDate.getDate(),
        year = currentDate.getFullYear();

        let noteInfo = {title, description, date: `${month} ${day}, ${year}`}
        if(!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes(); 
        closeIcon.click();
    }
});