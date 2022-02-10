'use strict'
// NOTE: formula: cell = row * 9 + col

// ?CONSTANT
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// ?input number
let arr = Array.from({ length: 9 }, i => new Array(9))
arr.forEach(subArr => subArr.fill([]))

// !TEST: easy
// arr = [
//   [1, 5, [], [], 4, 2, [], [], 6],
//   [2, 7, 4, 5, 6, [], [], 1, []],
//   [[], [], 6, [], [], 7, 4, [], 2],
//   [[], 1, [], [], [], [], [], 4, []],
//   [[], [], [], [], 5, [], [], [], []],
//   [[], 6, [], 4, [], 3, 1, 9, []],
//   [[], 2, [], 6, [], 5, 9, [], []],
//   [9, 8, 5, [], 3, [], [], 6, []],
//   [[], 4, [], 2, 1, 9, 8, 3, []],
// ]

// !TEST: professional 1
arr = [
  [[], 2, [], 9, [], 3, [], 6, 8],
  [6, [], [], 2, 5, [], 1, [], []],
  [[], [], 5, [], [], [], [], [], []],
  [[], 3, [], [], [], [], [], 8, []],
  [[], 6, 4, [], 3, 8, [], [], []],
  [[], [], [], 1, 6, 2, [], 3, []],
  [[], 4, [], [], [], 6, 8, [], []],
  [2, [], [], [], 9, [], 4, 7, []],
  [[], [], [], [], [], [], 9, [], []],
]
// !TEST: professional 2
// arr = [
//   [[], 8, [], [], [], 7, [], 6, []],
//   [4, [], 5, 3, [], [], [], [], []],
//   [[], 1, [], 2, [], [], 5, [], []],
//   [[], [], 4, [], [], [], [], 1, []],
//   [[], [], [], [], [], [], [], [], 6],
//   [[], 6, 3, [], [], [], [], [], 8],
//   [[], [], [], [], 1, [], [], 2, []],
//   [[], [], [], [], 6, [], [], 5, []],
//   [[], [], [], 9, [], [], 7, [], 3],
// ]
// !TEST: hard
// arr = [
//   [[], [], 4, 8, 6, [], [], 3, []],
//   [[], [], 1, [], [], [], [], 9, []],
//   [8, [], [], [], [], 9, [], 6, []],
//   [5, [], [], 2, [], 6, [], [], 1],
//   [[], 2, 7, [], [], 1, [], [], []],
//   [[], [], [], [], 4, 3, [], [], 6],
//   [[], 5, [], [], [], [], [], [], []],
//   [[], [], 9, [], [], [], 4, [], []],
//   [[], [], [], 4, [], [], [], 1, 5],
// ]
// !medium
// arr = [
//   [[], [], [], 4, [], [], 2, [], []],
//   [[], [], 2, [], [], [], [], 1, 8],
//   [5, [], 6, 9, [], [], [], 3, []],
//   [[], 6, 9, [], [], [], 3, [], []],
//   [[], 5, [], [], [], [], [], 2, 1],
//   [8, [], [], 1, 5, 7, 6, [], 9],
//   [[], [], [], [], 3, [], 9, 6, []],
//   [9, [], [], 6, [], 2, [], 5, []],
//   [[], [], [], [], [], [], 7, [], 2],
// ]

// ?Element
const cells = document.querySelectorAll('.sudoku-cell')
const grid = document.querySelector('.sudoku-grid')
const app = document.querySelector('.app')
const btnSolve = document.querySelector('.btn-solve')

// ?Helper
const cellLocale = i => {
  const col = i % 9
  const row = Math.floor(i / 9)
  let box = 1

  if (col >= 0 && col <= 2) box = 0
  if (col >= 3 && col <= 5) box = 1
  if (col >= 6 && col <= 8) box = 2

  if (row >= 3 && row <= 5) box += 3
  if (row >= 6 && row <= 8) box += 6

  return { row, col, box }
}

const inputValid = value => {
  if (!numbers.includes(value)) return false
  return true
}

// ?Generate col and box
const generateColArr = col => {
  const colArr = []
  for (let i = 0; i < 9; i++) {
    colArr.push(arr[i][col])
  }
  return colArr
}

const generateBoxArr = box => {
  const boxArr = []
  for (let i = 0; i < 81; i++) {
    if (cellLocale(i).box === box)
      boxArr.push(arr[cellLocale(i).row][cellLocale(i).col])
  }
  return boxArr
}

// !find cell index from box (return cell index)
const boxToCell = (box, index) => {
  const coordBox = [
    // [row, col]
    [0, 0], //index 0
    [0, 1], //index 1
    [0, 2], //index 2
    [1, 0], //index 3
    [1, 1], //index 4
    [1, 2], //index 5
    [2, 0], //index 6
    [2, 1], //index 7
    [2, 2], //index 8
  ]

  if ([1, 4, 7].includes(box)) coordBox[index][1] += 3
  if ([2, 5, 8].includes(box)) coordBox[index][1] += 6

  if ([3, 4, 5].includes(box)) coordBox[index][0] += 3
  if ([6, 7, 8].includes(box)) coordBox[index][0] += 6

  const [row, col] = coordBox[index]
  // console.log(row, col)
  return row * 9 + col
}

// console.log(boxToCell(2, 7))

// TODO: SUDOKU CHECK
const checkRow = (row, value) => {
  const rowArr = arr[row]
  if (rowArr.includes(value)) return false
  return true
}

const checkCol = (col, value) => {
  const colArr = []
  for (let i = 0; i < 9; i++) {
    colArr.push(arr[i][col])
  }
  if (colArr.includes(value)) return false
  return true
}

const checkBox = (box, value) => {
  const boxArr = []

  for (let i = 0; i < 81; i++) {
    if (cellLocale(i).box === box)
      boxArr.push(arr[cellLocale(i).row][cellLocale(i).col])
  }

  if (boxArr.includes(value)) return false
  return true
}

const isCorrect = (row, col, box, value) => {
  if (checkRow(row, value) && checkCol(col, value) && checkBox(box, value))
    return true
  return false
}

// TODO: SUDOKU SOLVE
const findByCell = index => {
  const { row, col, box } = cellLocale(index)
  // console.log(row, col)

  // if (typeof arr[row][col] !== 'number')
  if (arr[row][col].length === 0)
    numbers.forEach(number => {
      if (isCorrect(row, col, box, number) && !arr[row][col].includes(number))
        arr[row][col].push(number)
    })

  return arr[row][col]
}

// ?find possible numbers of a cell then push to an array
const findByRow = row => {
  let rowArr
  if (typeof row === 'number') {
    rowArr = arr[row]
  } else {
    rowArr = row
  }

  const tempArr = []
  rowArr.forEach(item => {
    if (typeof item !== 'number') tempArr.push(item)
  })

  const flatArr = tempArr.flat()

  // todo: find number exist only one time
  const counts = {}
  flatArr.forEach(x => {
    counts[x] = (counts[x] || 0) + 1
  })

  const result = []
  for (const [key, value] of Object.entries(counts)) {
    if (value === 1) result.push(Number(key))
  }

  // console.log(result)
  return result
}

const findByCol = col => {
  const colArr = generateColArr(col)

  const result = findByRow(colArr)
  return result
}

const findByBox = box => {
  const boxArr = generateBoxArr(box)

  return findByRow(boxArr)
}

// ?---------------------------
// ?Style
cells.forEach((cell, i) => {
  const { col, row } = cellLocale(i)

  if (row === 2 || row === 5) cell.style.marginBottom = '20px'
  if (col === 2 || col === 5) cell.style.marginRight = '20px'

  // !TEST VALUE
  if (arr[row][col] !== []) cells[i].value = arr[row][col]
})

// ?Handle event
// *handle input
cells.forEach((cell, i) => {
  const { col, row, box } = cellLocale(i)

  // *on input
  cell.addEventListener('input', e => {
    const value = Number(e.target.value)

    // console.log(value)

    e.target.classList.remove('err')

    if (!inputValid(value)) {
      e.target.value = ''
      e.target.classList.add('err')
      return
    }

    if (!isCorrect(row, col, box, value)) {
      e.target.value = ''
      e.target.classList.add('err')
      arr[row][col] = []
      return
    }

    arr[row][col] = Number(e.target.value)
  })

  // *on unfocus
  cell.addEventListener('focusout', e => e.target.classList.remove('err'))

  // cell.addEventListener('mouseenter', e => console.log(arr[row][col]))
})

// *handle solve button
btnSolve.addEventListener('click', () => {
  // NOTE: done find by cell
  let validQuantity = arr.flat().filter(val => val >= 1 && val <= 9).length

  const count = []
  count.push(validQuantity)

  // ?Loop 81 cell
  const loopCell = () => {
    for (let i = 0; i < 81; i++) {
      const { row, col, box } = cellLocale(i)

      // todo: set current cell to empty array -> reset cell
      if (typeof arr[row][col] !== 'number') arr[row][col] = []

      // todo: possible numbers
      const numberTempArr = findByCell(i)
      if (numberTempArr.length === 1 && typeof numberTempArr !== 'number') {
        arr[row][col] = numberTempArr[0]
        cells[i].value = numberTempArr[0]
        cells[i].style.color = 'var(--blue)'
        validQuantity++
      }
    }
  }

  // ?Loop 9 rows (row: i; col: index)
  const loopRow = () => {
    for (let i = 0; i < 9; i++) {
      const possibleNum = findByRow(i)
      arr[i].forEach((item, index) => {
        // *if item is array => loop it
        if (typeof item !== 'number') {
          item.forEach(num => {
            if (possibleNum.includes(num)) {
              arr[i][index] = num
              cells[i * 9 + index].value = num
              cells[i * 9 + index].style.color = 'var(--blue)'
              validQuantity++
            }
          })
          loopCell()
        }
      })
    }
  }

  // ?Loop 9 cols
  const loopCol = () => {
    for (let i = 0; i < 9; i++) {
      const possibleNum = findByCol(i)
      const colArr = generateColArr(i)

      colArr.forEach((item, index) => {
        // console.log(i, index, item)

        // *if item is array => loop it
        if (typeof item !== 'number') {
          item.forEach(num => {
            if (possibleNum.includes(num)) {
              arr[index][i] = num
              cells[index * 9 + i].value = num
              cells[index * 9 + i].style.color = 'var(--blue)'
              validQuantity++
            }
          })
          loopCell()
        }
      })
    }
  }

  // ?Loop 9 boxes
  const loopBox = () => {
    for (let i = 0; i < 9; i++) {
      const possibleNum = findByBox(i)
      const boxArr = generateBoxArr(i)

      boxArr.forEach((item, index) => {
        // console.log(i, index, item)

        // *if item is array => loop it
        if (typeof item !== 'number') {
          item.forEach(num => {
            if (possibleNum.includes(num)) {
              arr[cellLocale(boxToCell(i, index)).row][
                cellLocale(boxToCell(i, index)).col
              ] = num
              cells[boxToCell(i, index)].value = num
              cells[boxToCell(i, index)].style.color = 'var(--blue)'
              validQuantity++
            }
          })
          loopCell()
        }
      })
    }
  }

  do {
    // ?Loop 81 cell
    loopCell()

    loopRow()
    // loopCell()

    loopCol()
    // loopCell()

    loopBox()
    // loopCell()
    count.push(validQuantity)
  } while (count[count.length - 2] !== count[count.length - 1])

  console.log(arr)
})
