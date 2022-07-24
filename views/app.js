const taskList = document.querySelector('ul')

const btnAdd = document.querySelector('.btn-add')

const work = document.querySelector('#task-content')

const popup = document.querySelector('.pop-up')

const btnOK = document.querySelector('.btn-ok')

const btnCancel = document.querySelector('.btn-cancel')

const btnClose = document.querySelector('.fa-xmark')

const editInput = document.querySelector('#task-change-content')

var tasks = document.querySelectorAll('.task-item')

var target

btnClose.addEventListener('click', () => {
    popup.classList.add('hide')
})

btnCancel.addEventListener('click', () => {
    popup.classList.add('hide')
})

btnOK.addEventListener('click', () => {
    if(editInput.value)
    {
        let reqBody = {work: target.parentNode.parentNode.querySelector('.work').textContent.trim(), newWork: editInput.value}
        fetch(window.location.href, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reqBody)
        })
        .then(res => res.json())
        .then(data => {     
            if(data == 'Sửa thành công')
                target.parentNode.parentNode.querySelector('.work').textContent = editInput.value
            else 
                alert(data)
            editInput.value = ''
            popup.classList.add('hide')
        })
    }
})

tasks.forEach(task => {
    task.querySelector('.fa-check').addEventListener('click', (e) => {
        let reqBody
        if(e.target.parentNode.parentNode.classList.contains('done'))
            reqBody = {work: e.target.parentNode.parentNode.querySelector('.work').textContent.trim(), done: false}
        else 
            reqBody = {work: e.target.parentNode.parentNode.querySelector('.work').textContent.trim(), done: true}
        fetch(window.location.href, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reqBody)
        })
        .then(res => res.json())
        .then(data => {
            if(data == 'Sửa thành công')
                e.target.parentNode.parentNode.classList.toggle('done')
            else
                alert(data)
        })         
    })
    task.querySelector('.fa-trash').addEventListener('click', (e) => {
        let reqBody = {work: e.target.parentNode.parentNode.querySelector('.work').textContent.trim(), delete: true}
        fetch(window.location.href, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reqBody)
        })
        .then(res => res.json())
        .then(data => {
            if(data == 'Sửa thành công')
                e.target.parentNode.parentNode.remove()
            else 
                alert(data)
        })
    })
    task.querySelector('.fa-pen').addEventListener('click', (e) => {
        target = e.target
        popup.classList.remove('hide')
        editInput.value = e.target.parentNode.parentNode.querySelector('.work').textContent.trim()
    })
})

btnAdd.addEventListener('click', () => {
    if(work.value)
    {
        fetch(window.location.href, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({work: work.value, done: false})
        })
        .then(res => res.json())
        .then(data => {
            if(data == 'Thêm thành công') {
                let taskItem = document.createElement('li')
                taskItem.classList.add('task-item')
                taskItem.innerHTML = `<div class="work">
                ${work.value}
                </div>
                <div class="edit">
                <i class="fa-solid fa-check"></i>
                <i class="fa-solid fa-pen"></i>
                <i class="fa-solid fa-trash"></i>
                </div>`
                taskItem.querySelector('.fa-check').addEventListener('click', (e) => {
                    let reqBody
                    if(e.target.parentNode.parentNode.classList.contains('done'))
                        reqBody = {work: e.target.parentNode.parentNode.querySelector('.work').textContent.trim(), done: false}
                    else 
                        reqBody = {work: e.target.parentNode.parentNode.querySelector('.work').textContent.trim(), done: true}
                    fetch(window.location.href, {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(reqBody)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data == 'Sửa thành công')
                            e.target.parentNode.parentNode.classList.toggle('done')
                        else
                            alert(data)
                    })         
                })
                taskItem.querySelector('.fa-trash').addEventListener('click', (e) => {
                    let reqBody = {work: e.target.parentNode.parentNode.querySelector('.work').textContent.trim(), delete: true}
                    fetch(window.location.href, {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(reqBody)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data == 'Sửa thành công')
                            e.target.parentNode.parentNode.remove()
                        else 
                            alert(data)
                    })
                })
                taskItem.querySelector('.fa-pen').addEventListener('click', (e) => {
                    popup.classList.remove('hide')
                    editInput.value = e.target.parentNode.parentNode.querySelector('.work').textContent.trim()
                    btnOK.addEventListener('click', () => {
                        if(editInput.value)
                        {
                            let reqBody = {work: e.target.parentNode.parentNode.querySelector('.work').textContent.trim(), newWork: editInput.value}
                            fetch(window.location.href, {
                                method: 'PUT',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify(reqBody)
                            })
                            .then(res => res.json())
                            .then(data => {
                                if(data == 'Sửa thành công')
                                    e.target.parentNode.parentNode.querySelector('.work').textContent = editInput.value
                                else 
                                    alert(data)
                                editInput.value = ''
                                popup.classList.add('hide')
                            })
                        }
                    })
                })
                taskList.appendChild(taskItem)
                work.value = ''
            }
            else 
                alert(data)
        })
    }
})