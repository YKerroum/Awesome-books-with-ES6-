const listb = document.getElementById('list-b');
const addnewb = document.getElementById('addnew-b');
const contactb = document.getElementById('Contact-b');

const closebook = document.getElementById('showbookclose');
const closeaddbook = document.getElementById('addbooksclose');
const closecontact = document.getElementById('contactclose');

const timecontainer = document.getElementById('time-update');
const bo = document.querySelector('.AllB');

nth=(d) =>{
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}
formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12;
  minutes = minutes.toString().padStart(2, '0');
  const strTime = `${hours}:${minutes}:${seconds} ${ampm}`;
  return strTime;
}

class BookClass {
  constructor() {
    this.AllBooks = (localStorage.storagebook != null) ? JSON.parse(localStorage.storagebook) : [];
  }

  addbook=() => {
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    this.AllBooks.push({ title: title.value, author: author.value });
    this.updateLocalStorage();
  }

  destroybook= (id) => {
    this.AllBooks.splice(id, 1);
    this.updateLocalStorage();
  }

  showbooks = () => {
    const ulist = document.createElement('ul');
    ulist.className = 'booksList';
    bo.innerHTML = '';
    bo.appendChild(ulist);
    let id = 0;
    this.AllBooks.forEach((book) => {
      ulist.innerHTML
      += `<li class="booksLine ${id % 2 === 0 ? 'grey' : ''}">
      <span>"${book.title}" by ${book.author}</span>
      <button type="button" class="btn-remove" onClick="storagebook.destroybook(${id})">Remove</button>
      </li>`;
      id += 1;
    });
    listb.classList.add('active');
    const d = new Date();
    const date = d.getDate();
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
    const year = d.getFullYear();
    timecontainer.innerHTML = `${month} ${date}${nth(date)} ${year}, ${formatAMPM(d)}`;
  }

  updateLocalStorage= () => {
    localStorage.storagebook = JSON.stringify(this.AllBooks);
    this.showbooks();
  }
}

const storagebook = new BookClass();

storagebook.showbooks();

listopen= () => {
  closebook.classList.remove('hidden');
  closeaddbook.classList.add('hidden');
  closecontact.classList.add('hidden');
  listb.classList.add('active');
  addnewb.classList.remove('active');
  contactb.classList.remove('active');
}

addnewopen=() =>{
  closebook.classList.add('hidden');
  closeaddbook.classList.remove('hidden');
  closecontact.classList.add('hidden');
  listb.classList.remove('active');
  addnewb.classList.add('active');
  contactb.classList.remove('active');
}

contactopen= () => {
  closebook.classList.add('hidden');
  closeaddbook.classList.add('hidden');
  closecontact.classList.remove('hidden');
  listb.classList.remove('active');
  addnewb.classList.remove('active');
  contactb.classList.add('active');
}

listb.addEventListener('click', listopen);
addnewb.addEventListener('click', addnewopen);
contactb.addEventListener('click', contactopen);