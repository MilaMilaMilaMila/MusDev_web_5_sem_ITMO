function fetchComments() {
    return new Promise(function(resolve, reject) {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Ошибка при выполнении запроса');
                }
                return response.json();
            })
            .then(function(data) {
                resolve(data); // Возвращаем полученные данные
            })
            .catch(function(error) {
                reject(error); // Возвращаем ошибку, если что-то пошло не так
            });
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getCom() {
    await sleep(1000)
    // Вызов функции fetchComments и обработка результата
    fetchComments()
        .then(function (comments) {
            processComments(comments)
            // console.log(comments);
        })
        .catch(function (error) {
            const warningElement = document.createElement('div');
            warningElement.classList.add('warning-element');
            warningElement.textContent = '⚠ Что-то пошло не так';
            var parent = document.getElementById("statistics")
            parent.appendChild(warningElement);
            console.error(error);
        });

    var preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
}


function processComments(json) {
    const comments = json;

    const selectedComments = [];
    const wordCount = Math.floor(Math.random() * 8) + 5;

    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i]; // Выбранный комментарий
        const words = comment.body.split(' ');
        console.log(wordCount)
        if (words.length >= wordCount) {
            const selectedWords = words.slice(0, wordCount);
            const selectedText = selectedWords.join(' ');
            const commentData = [comment.name, comment.email, selectedText];
            selectedComments.push(commentData);
            if(selectedComments.length === 5) {
                break
            }
        }
    }
    console.log(selectedComments)
    createCommentBlocks(selectedComments)
}

function createCommentBlocks(comments) {
    const container = document.createElement('div');
    comments.forEach(function(commentData) {
        const commentBlock = document.createElement('div');
        commentBlock.classList.add('comment-block');

        const nameElement = document.createElement('div');
        const emailElement = document.createElement('div');
        const bodyElement = document.createElement('div');

        nameElement.textContent = commentData[0];
        nameElement.classList.add('comment-name');

        emailElement.textContent = commentData[1];
        emailElement.classList.add('comment-email');

        bodyElement.textContent = commentData[2];
        bodyElement.classList.add('comment-body');

        commentBlock.appendChild(nameElement);
        commentBlock.appendChild(emailElement);
        commentBlock.appendChild(bodyElement);

        container.appendChild(commentBlock);
    });
    var parent = document.getElementById("statistics")

    container.style.overflowY = "scroll"
    parent.appendChild(container);
}