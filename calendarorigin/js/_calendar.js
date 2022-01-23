(function () {
  let calendar = document.getElementById("calendar");
  let table = document.getElementById("calendar-table");
  let tableTBody = document.getElementById("calendar-table-tBody");
  let prev = document.querySelector("#prev");
  let next = document.querySelector("#next");
  let arrNamesOfMonths = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  // ------Переменные для работы-------
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  // -----------ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ РАБОТЫ ТАБЛИЦЫ КАЛЕНДАРЯ----------------

  function range(count) {
    let arrDates = [];
    for (let i = 1; i <= count; i++) {
      arrDates.push(i);
    }
    return arrDates;
  }
  function getLastDay(year, month) {
    let lastDayNumber = new Date(year, month + 1, 0);
    return lastDayNumber.getDate();
  }

  function getFirstWeekDay(year, month) {
    let firstWeekDayNumber = new Date(year, month, 1);
    let res = firstWeekDayNumber.getDay();
    if (res == 0) {
      res = 7;
    }
    return res;
  }
  function getLastWeekDay(year, month) {
    let lastWeekDayNumber = new Date(year, month + 1, 0);
    let res = lastWeekDayNumber.getDay();
    if (res == 0) {
      res = 7;
    }
    return res;
  }
  function normalize(arr, left, right) {
    const _lengthWeek = 7,
      _heightCalendar = 6;
    let arrAllElemCalend = [];
    let lastPrevDate = new Date(year, month, 1 - left).getDate();
    let firstNextDate = new Date(year, month + 1, 1).getDate();

    for (let i = 0; i < left; i++) {
      arrAllElemCalend.push({
        lastprevdate: lastPrevDate++,
        color: "invalted-days-color",
      });
    }
    arrAllElemCalend.push(...arr);
    for (let i = 0; i < right; i++) {
      arrAllElemCalend.push({
        firstnextdate: firstNextDate++,
        color: "invalted-days-color",
      });
    }
    _appendLastDaysRecursionForNormalize(
      arrAllElemCalend,
      _lengthWeek,
      _heightCalendar,
      firstNextDate
    );
    return arrAllElemCalend;
  }
  function _appendLastDaysRecursionForNormalize(
    arr,
    len,
    height,
    firstNextDate
  ) {
    if (arr.length / len < height) {
      for (let i = 0; i < 7; i++) {
        arr.push({
          firstnextdate: firstNextDate++,
          color: "invalted-days-color",
        });
      }
      _appendLastDaysRecursionForNormalize(arr, len, height, firstNextDate);
    }
  }
  function chunk(arr, n) {
    let chunkArr = [];
    let length = arr.length / n;
    if (length < 6) {
      length = 6;
    }
    for (let i = 0; i < length; i++) {
      chunkArr[i] = [];

      for (let k = 0; k < n; k++) {
        chunkArr[i].push(arr.splice(0, 1)[0]);
      }
    }

    return chunkArr;
  }
  function createTable(tBodyId, arr) {
    for (const trs of arr) {
      let tr = document.createElement("tr");
      for (const data of trs) {
        let td = document.createElement("td");
        if (typeof data == "object" || data == undefined) {
          for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
              const element = data[key];
              td.innerHTML = data["lastprevdate"] || data["firstnextdate"];
              td.classList.add(data["color"]);
            }
          }
        } else td.innerHTML = data;
        getCurrentDate(year, month, td);
        tr.appendChild(td);
      }
      tBodyId.appendChild(tr);
    }
  }
  function _updateTBody(tableId) {
    tableId.removeChild(tableId.lastElementChild);
    let tbody = document.createElement("tbody");
    tbody.setAttribute("id", "calendar-table-tBody");
    tableId.appendChild(tbody);
    return tbody;
  }
  function getCurrentDate(y, m, td) {
    if (
      y == date.getFullYear() &&
      m == date.getMonth() &&
      td.innerHTML == date.getDate() &&
      td.classList.length == 0
    ) {
      td.classList.add("current");
    } else td.classList.remove("current");
  }
  // ---------ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ РАБОТЫ ИНФОРМЕРОВ-----------------
  function informer(year, month) {
    let p = calendar.querySelector("div>p");
    p.firstElementChild.innerHTML = arrNamesOfMonths[month];
    p.lastElementChild.innerHTML = year;
  }
  //----------------СОБИРАТЕЛЬ------------------------
  function draw(tableId, year, month) {
    let tbody = _updateTBody(tableId);
    let _arr = range(getLastDay(year, month));
    let _firstWeekDay = getFirstWeekDay(year, month);
    let _lastWeekDay = getLastWeekDay(year, month);
    let nums = chunk(normalize(_arr, _firstWeekDay - 1, 7 - _lastWeekDay), 7);
    createTable(tbody, nums);

    informer(year, month);
  }
  //-----------Переключатели-----------------
  prev.addEventListener("click", function () {
    month--;
    if (month < 0) {
      month = 11;
      year -= 1;
    }
    draw(table, year, month);
  });
  next.addEventListener("click", function () {
    month++;
    if (month > 11) {
      month = 0;
      year += 1;
    }
    draw(table, year, month);
  });

  // ----------ВЫЗОВ РАБОЧИХ ФУНКЦИЙ-----------
  draw(table, year, month);
})();
