const form = document.querySelector('.form');
const addBtn = document.querySelector('.add');
const subBtn = document.querySelector('.sub');
const checkboxes = document.querySelectorAll('.checkbox');
const numberField = document.querySelector('.counter input');
const textarea = document.querySelector('.textarea');
const errorMsgOutput = document.querySelector('.errorMsgOutput');
const submitBtn = document.querySelector('#submit');

const errorMsg = {
  quantity: `<p>Por favor, insira um valor acima de zero.</p>`,
  sticker: '<p> Escolha um ou mais dos sticker acima.</p>'
}
const userValues = {
  sticker: false,
  quantity: 0,
  comment: undefined
}

function loadEvent() {
  addBtn.addEventListener('click', addNumber, false);
  subBtn.addEventListener('click', subNumber, false);
  textarea.addEventListener('change', getComments)
  form.addEventListener('submit', handleSubmit, false)

  Array.from(checkboxes).map(elem => {
    elem.addEventListener('click',function(e) {
      validateCheckbox(e)
    })
  })

}

function addNumber(e) {
  e.preventDefault()
  numberField.value++;
  userValues.quantity = numberField.value;
}

function subNumber(e) {
  e.preventDefault()
  numberField.value--;
  validateNumber(numberField)
  userValues.quantity = numberField.value;
}

function validateCheckbox(e) {
  e.preventDefault()

  if(e.target.checked) {
    userValues.sticker = true;
  }
  console.log(userValues)
}

function validateNumber(num) {

  if (Number(numberField.value <= 100)) {
    num.style.backgroundColor = 'rgba(255, 0, 0, 0.356)';
    num.disabled = 'true';
    numberField.value = 0;
    subBtn.classList.add('disabled-div');
    errorMsgOutput.style.display = 'block';
    errorMsgOutput.innerHTML = errorMsg.quantity;
  }
  setTimeout(function () {
    numberField.style.backgroundColor = '#dde3e9';
    numberField.value = 0;
    subBtn.classList.remove('disabled-div');
    errorMsgOutput.style.display = 'none'
  }, 3000);
}

function getComments() {
  userValues.comment = textarea.value;
}

function handleSubmit(e) {
  e.preventDefault();
  const message = document.querySelector('.formMsg');

  if(userValues.quantity || userValues.sticker > 100) {
    // show the spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'block';

    setTimeout(function () {
      spinner.style.display = 'none';
      message.style.display = 'block';
      message.innerHTML = `<h4>Pedido foi enviado com sucesso!</h4>`
      setTimeout(function () {
        window.location.reload()
      }, 1000)
    }, 3000)
  }
}

window.addEventListener('DOMContentLoaded', loadEvent)


