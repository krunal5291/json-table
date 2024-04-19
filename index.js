const updateData = (id, data) => {
    try {
        fetch(`http://localhost:3000/students/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error.message);
    }

}

const deleteData = (id) => {

    try {
        fetch(`http://localhost:3000/students/${id}`, {
            method: "DELETE",
        })
    } catch (error) {
        console.log(error.message);
    }
}

const submitForm = (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        rollNumber: document.getElementById("rollnumber").value,
        hindi: parseInt(document.getElementById("sub-1").value, 10),
        english: parseInt(document.getElementById("sub-2").value, 10),
        math: parseInt(document.getElementById("sub-3").value, 10),
    };

    formData.tScore = formData.hindi + formData.english + formData.math;
    formData.result = formData.tScore >= 250 ? "Pass" : "Fail";

    let tr = document.createElement("tr");
    function createTD(text) {
        let td = document.createElement("td");
        td.textContent = text;
        return td;
    }

    let tdSNO = createTD(document.querySelectorAll("#body tr").length + 1);
    let tdName = createTD(formData.name);
    let tdRollNumber = createTD(formData.rollNumber);
    let tdHindi = createTD(formData.hindi);
    let tdEnglish = createTD(formData.english);
    let tdMath = createTD(formData.math);
    let tdTScore = createTD(formData.tScore);
    let tdResult = createTD(formData.result);

    let tdUpdate = createTD("Update");
    tdUpdate.style.backgroundColor = "pointer";

    tdTScore.style.background="rad"
    let tdDelete = createTD("Delete");
    tdDelete.style.cursor = "pointer";
    tdDelete.style.backgroundColor = "#D50000";
    tdDelete.style.color = "white";
    tdDelete.addEventListener("click", (e) => {
        
        e.target.parentElement.remove();
    });

    tr.append(tdSNO, tdName, tdRollNumber, tdHindi, tdEnglish, tdMath, tdTScore, tdResult, tdUpdate, tdDelete);

    document.getElementById("body").appendChild(tr);

    document.getElementById("form").reset();
};


const getData = () => {
    try {
        fetch("http://localhost:3000/students")
            .then(response => response.json())
            .then(response => submitForm(response));
    } catch (error) {
        console.log(error.message);
    }
}

getData()

const postData = (data) => {
    fetch("http://localhost:3000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
}

document.getElementById("form").addEventListener("submit", submitForm);




