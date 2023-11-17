 function generate_schedule() {
     var element = document.getElementById("get-schedule");
     if (element) {
         element.parentNode.removeChild(element);
     }

    var formContainer = document.getElementById("form-container");
    var generateFormButton = document.getElementById("generate-form-button");

    generateFormButton.addEventListener("click", function() {
        var form = document.createElement("form");
        var label = document.createElement("label");
        var input = document.createElement("input");
        var submitButton = document.createElement("input");

        label.textContent = "Количество учеников: ";
        input.type = "number";
        submitButton.type = "button";
        submitButton.value = "Продолжить";



        submitButton.addEventListener("click", function() {

            var studentsAmount = input.value;
            console.log("Количество учеников: " + studentsAmount);

            var generateScheduleButton = document.createElement("button");
            generateScheduleButton.textContent = "Добавить данные учеников";
            generateScheduleButton.addEventListener("click", function() {
                console.log("Нажата кнопка 'Добавить данные учеников'");
                generateSchedule(studentsAmount)
            });

            formContainer.removeChild(form);
            formContainer.appendChild(generateScheduleButton);
        });

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(submitButton);

        formContainer.removeChild(generateFormButton);
        formContainer.appendChild(form);
    });
}


 function generateSchedule(studentsAmount) {

     var body = document.body;
     while (body.firstChild) {
         body.removeChild(body.firstChild);
     }

     var table = document.createElement("table");
     var thead = document.createElement("thead");
     var headerRow = document.createElement("tr");
     var headers = ["Имя", "Номер телефона", "Инструмент", "Количество занятий в неделю"];

     for (var i = 0; i < headers.length; i++) {
         var th = document.createElement("th");
         th.textContent = headers[i];
         headerRow.appendChild(th);
     }

     thead.appendChild(headerRow);
     table.appendChild(thead);

     var tbody = document.createElement("tbody");
     for (var i = 0; i < studentsAmount; i++) {
         var row = document.createElement("tr");

         for (var j = 0; j < 4; j++) {
             var cell = document.createElement("td");
             var input = document.createElement("input");
             if (j % 4 === 3) {
                 input.type = "number";
             }
             else {
                 input.type = "text";
             }
             cell.appendChild(input);

             row.appendChild(cell);
         }

         tbody.appendChild(row);
     }

     table.appendChild(tbody);
     body.appendChild(table);

     var saveButton = document.createElement("button");
     saveButton.textContent = "Сгенерировать расписание";

     saveButton.addEventListener("click", function() {
         students = new Array(studentsAmount);

         var inputs = document.getElementsByTagName("input");
         var curStudent = 0;
         for (var i = 0; i < inputs.length;) {
             students[curStudent] = new Array(4);
             for (var j = 0; j < 4; j++) {
                 students[curStudent][j] = inputs[i].value;
                 i++;
             }
             curStudent++;
         }
         console.log(students);
         displayStudents(students)
     });

     body.appendChild(saveButton);
 }


 function displayStudents(students) {
     var body = document.body;
     while (body.firstChild) {
         body.removeChild(body.firstChild);
     }


     for (var i = 0; i < students.length; i++) {
         var student = students[i];
         var block = document.createElement("div");

         var name = document.createElement("p");
         name.textContent = "Имя: " + student[0];
         block.appendChild(name);

         var number = document.createElement("p");
         number.textContent = "Номер телефона: " + student[1];
         block.appendChild(number);

         var instrument = document.createElement("p");
         instrument.textContent = "Инструмент: " + student[2];
         block.appendChild(instrument);

         var table = document.createElement("table");
         var tbody = document.createElement("tbody");

         console.log(parseInt(student[3]))

         for (var j = 0; j < parseInt(student[3]); j++) {
             var row = document.createElement("tr");
             var cell = document.createElement("td");

             var input = document.createElement("input");
             input.type = "text";
             input.value = "день недели и время ";

             cell.appendChild(input);
             row.appendChild(cell);
             tbody.appendChild(row);
         }

         table.appendChild(tbody);
         block.appendChild(table);
         body.appendChild(block);
     }

     var saveButton = document.createElement("button");
     saveButton.textContent = "Сохранить";

     saveButton.addEventListener("click", function() {
         var students_amount = students.length;
         studentsSave = new Array(students_amount);
         var curInput = 0
         var inputs = document.getElementsByTagName("input");
         for (var i = 0; i < students_amount; i++) {
             studentsSave[i] = new Array(3 + parseInt(students[i][3]));
             studentsSave[i][0] = students[i][0];
             studentsSave[i][1] = students[i][1];
             studentsSave[i][2] = students[i][2];

             for (var j = 3; j < 3 + parseInt(students[i][3]); j++) {
                 studentsSave[i][j] = inputs[curInput].value;
                 curInput++;
             }
         }

         console.log(studentsSave);
         saveStudentsToLocalStorage(studentsSave);
         var savedStudents = getStudentsFromLocalStorage();
         console.log(savedStudents);
     });

     body.appendChild(saveButton);
 }

 function saveStudentsToLocalStorage(students) {
     var studentsJSON = JSON.stringify(students);
     localStorage.setItem("studentsData", studentsJSON);
 }

 function getStudentsFromLocalStorage() {
     var studentsJSON = localStorage.getItem("studentsData");
     return JSON.parse(studentsJSON);
 }

 function isStudentsDataStored() {
     var studentsData = localStorage.getItem("studentsData");
     return studentsData !== null;
 }

 function showSchedule(){
     if (isStudentsDataStored()) {
         console.log("Ключ 'studentsData' найден в локальном хранилище.");
         students = getStudentsFromLocalStorage()
         console.log(students);

         var body = document.body;
         while (body.firstChild) {
             body.removeChild(body.firstChild);
         }
         students_amount = students.length
         for (var i = 0; i < students_amount; i++) {
             var name = document.createElement("p");
             name.textContent = "Имя: " + students[i][0];
             body.appendChild(name);

             var number = document.createElement("p");
             number.textContent = "Номер телефона: " + students[i][1];
             body.appendChild(number);

             var instrument = document.createElement("p");
             instrument.textContent = "Инструмент: " + students[i][2];
             body.appendChild(instrument);

             days_schedule = document.createElement("p");
             days_schedule.textContent = "расписание: "
             days = students[i].length
             for (var j = 3; j < days; j++) {
                 days_schedule.textContent += students[i][j] + " | ";
             }

             body.appendChild(days_schedule);

         }

     } else {
         alert("Расписание не найдено. Попробуйте его создать!")
         console.log("Ключ 'studentsData' отсутствует в локальном хранилище.");
     }
 }