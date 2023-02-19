const lengthPart = 8, // количество элементов в 1 части
      product = document.querySelector('.userCustomersList'),
      pagination = document.querySelector('.pagination');
      
let data = [...product.children]; // Тут храним все `.card`, типо аналог БД, т.е исходные данные.
let chunks = SplitParts(data); // Тут храним части. Ниже описание функции.

RenderChunks(0); // Рендерим первую часть. Описание функии ниже.
RenderPagination(); // Рендерим пагинацию. Описание тоже ниже.

// Механика работы пагинации
pagination.addEventListener('click', e => {
  let item = e.target.closest('.pagination-item'); // Тут тоже делегирование, как в механике выше.
  if(item) {
    let active = pagination.querySelector('.pagination-item.active'), // получим активную страницу
        part; // сюда запишем номер части, для проверок пагинации
    if(item.classList.contains('item-prev') || item.classList.contains('item-next')) { // если нажата кнопка "вперёд" или "назад"
      if(item.classList.contains('disable')) return false; // Если кнопка имеет класс `disable`, то прекращаем выполнение кода ниже
      part = +active.dataset.part; // записываем номер части активной страницы.
      part = item.classList.contains('item-prev') ? part - 1 : part + 1; // Если нажата кнопка "назад", то отнимаем единицу активной старница, если "вперёд", то прибавляем.
          
      RenderChunks(part); // Рендерим страница
      // Меняем в пагинации активную страницу
      active.classList.remove('active'); // Находим активную и удаляем класс `active`
      pagination.querySelector(`.pagination-item[data-part="${part}"]`).classList.add('active'); // находим страницу с `data-part`, который равен активной странице и добавляем ему класс `active`
    } else { // Если нажаты кнопки страницы (1, 2, 3 и т.п.)
      active.classList.remove('active'); // удаляем класс `active` у активной.
      item.classList.add('active'); // добавляем нажатой кнопке класс `active`
      part = +item.dataset.part; // получаем её номер части
      RenderChunks(part); // Рендерим страницу.
    }
    // Тут запрещаем или разрешаем использовать кнопки "вперёд" или "назад", в зависимости от того, какая часть сейчас активна.
    let prev = pagination.querySelector('.pagination-item.item-prev'),
        next = pagination.querySelector('.pagination-item.item-next');
    
    // Сначала удалим у них класс `disable`, если он есть
    if(prev.classList.contains('disable')) prev.classList.remove('disable');
    if(next.classList.contains('disable')) next.classList.remove('disable');
    if(part === 0) prev.classList.add('disable'); // Проверим является ли активная страница началом частей, если да, то запретим использовать кнопку "назад"
    if(part === chunks.length - 1) next.classList.add('disable'); // если активная является концом частей, то запрещаем "вперёд".
  }
});


// Функция которая делит массив на части.
function SplitParts(arr) { // передаём массив, который нужно разбить
  if(arr.length > lengthPart) { // проверяем, имеет ли переданный массив длину больше, чем длина части
    let chunks = [], // подготавливаем возращаемый массив с частями
        parts = Math.floor(arr.length / lengthPart); // сколько частей получится
        
    for(let i = 0; i < arr.length; i+=lengthPart) // проходим по массиву, шаг длине части
      chunks.push(arr.slice(i, i+lengthPart)); // добавляем часть в массив с частями
    
    return chunks; // возвращаем массив
  } else return arr; // если получаемый массив меньше длины части, то возвращаем его же.
}

// Функция для вывода конкретно части в HTML
function RenderChunks(part) { // передаём порядковый номер части
  if(part >= 0 && part < chunks.length) { // если номер части > 0 и < длины частей
    product.innerHTML = ''; // очищаем элемент, куда будем выводить части
    chunks[part].map(elem => product.append(elem)); // Выводим т.к. в исходном массиве уже сразу Element, то мы можем добавить его через .append
  } else return false;
}

// Функия для создания пагинации
function RenderPagination() {
  pagination.innerHTML = ''; // Очищаем блок
  if(chunks.length > 1) { // Если частей больше одной, то выводим погинацию, иначе нет смысла..
    chunks.map((elem, i) => pagination.insertAdjacentHTML('beforeend', `<li class="pagination-item${i === 0 ? ' active' : ''}" data-part="${i}"><a href="#">${i+1}</a></li>`)); // Создаём столько же "ссылок", сколько частей есть
    // Ниже добавляем кнопки "вперёд" и "назад"
    pagination.insertAdjacentHTML('afterbegin', '<li class="pagination-item item-prev disable"><a href="#"><i class="fa fa-angle-left" aria-hidden="true"></i>&#8249;</a></li>'); // Т.к. данная функция создаёт пагинацию у которой первая страница активна, то сразу запрещаем кнопке "назад" работать.
    pagination.insertAdjacentHTML('beforeend', '<li class="pagination-item item-next"><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>&#8250;</a></li>');
  }
}