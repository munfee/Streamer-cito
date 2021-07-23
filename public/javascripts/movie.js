window.addEventListener('DOMContentLoaded', () => {

    const usernameForm = document.querySelector('#username');
    const commentForm = document.querySelector('#comment');

    printComments();

    fetch('/username')
        .then(res => res.json())
        .then(({ payload }) => {
            console.log(payload);
            if (payload) switchMethod(usernameForm, payload);
        })
        .catch(err => console.log(err));

    usernameForm.addEventListener('submit', handleSubmit);
    commentForm.addEventListener('submit', handleSubmit);

    function switchMethod(form, username) {
        const nameInput = form.querySelector('input');
        switch (form.dataset.method) {
            case ('POST'):
                form.dataset.method = 'DELETE';
                form.querySelector('button').textContent = 'Delete';
                if (username) {
                    nameInput.value = username;
                    nameInput.disabled = true;
                    nameInput.style.opacity = '0.5';
                }
                break;

            case ('DELETE'):
                form.dataset.method = 'POST';
                form.querySelector('button').textContent = 'Send';
                if (username) {
                    nameInput.value = '';
                    nameInput.disabled = false;
                    nameInput.style.opacity = '1';
                }
                break;
        }
    }

    function printComments() {
        const putNode = (nodeType, textNode) => {
            const node = document.createElement(nodeType);
            const text = document.createTextNode(textNode);
            node.append(text);
            return node;
        }
        fetch(`${window.location.pathname}/comment`)
            .then(res => res.json())
            .then(({ payload }) => {
                console.log(payload);
                let commentBox = document.getElementById('comment-box');
                commentBox.innerHTML = '';
                !payload ? commentBox.append(document.createTextNode('no comments yet'))
                    : payload.forEach(element => {
                        console.log(element.username);
                        let container = document.createElement('div');
                        container.append(putNode('h3', `${element.username} says:`));
                        container.append(putNode('p', element.comment));
                        commentBox.append(container);
                    });
            })
            .catch(err => console.log(err));
    }

    function handleSubmit(e) {
        e.preventDefault();
        let input = this.querySelector(`[name="${this.id}"]`);
        fetch(`${this.action}`, {
            method: this.dataset.method,
            body: JSON.stringify({ [this.id]: input.value }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(({ payload, message }) => {
                console.log(payload, message);
                if (this.id === 'username' && payload) switchMethod(this, payload);
                if (this.id === 'comment') {
                    printComments();
                    input.value = '';
                }
                document.querySelector(`#${this.id}-message`).textContent = message;
            })
            .catch(err => console.log(err));
    }
});