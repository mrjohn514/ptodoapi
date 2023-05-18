$(document).ready(() => {
  console.log('docuement renders')

  $.get('/todo', (data) => {
    const tasks = data.data.todos
    console.log(tasks)
    const $list = $('#task-list')
    tasks.forEach((task, index) => {
      $list.append(`
  <tr data-id="${task._id}">
    <td>${index}</td>
    <td>${task.description}</td>
    <td>${task.priority}</td>
     <td>${getStatusIcon(task)}</td>
    <td><a href="/cancel-todo/${task._id}" class="cancel-link">cancel</a></td>
    <td><a href="/complete-todo/${
      task._id
    }" class="complete-link">complete</a></td>
    <td><a href="/delete-todo/${task._id}" class="delete-link">Delete</a></td>
  </tr>
`)
    })
  })

  updateCounts()
  getsortedlist()
})

$('form').submit((event) => {
  event.preventDefault()
  const formData = $('form').serialize()

  $.post('/create-todo', formData, (data) => {
    const task = data.data.todo
    console.log(task)

    // Create the new row for the task
    const row = $('<tr>')
    const indexCell = $('<td>').text($('#task-list tr').length + 1)
    const descriptionCell = $('<td>').text(task.description)
    const priorityCell = $('<td>').text(task.priority)
    const statusCell = $('<td>').html('[&nbsp;&nbsp;&nbsp;]')
    const completeLink = $('<a>')
      .addClass('complete-link')
      .attr('href', `/complete-todo/${task._id}`)
      .text('Complete')
    const cancelLink = $('<a>')
      .addClass('cancel-link')
      .attr('href', `/cancel-todo/${task._id}`)
      .text('Cancel')
    const deleteLink = $('<a>')
      .addClass('delete-link')
      .attr('href', `/delete-todo/${task._id}`)
      .text('Delete')

    const actionCell1 = $('<td>').append(cancelLink)
    const actionCell2 = $('<td>').append(completeLink)
    const actionCell3 = $('<td>').append(deleteLink)

    row.append(
      indexCell,
      descriptionCell,
      priorityCell,
      statusCell,
      actionCell1,
      actionCell2,
      actionCell3
    )

    // Set the data-id attribute on the new row
    row.attr('data-id', task._id)

    // Find the correct position to insert the new task
    let $insertBeforeRow = null
    $('#task-list tr').each((index, row) => {
      const $row = $(row)
      const existingTaskPriority = $row.find('td').eq(2).text()
      if (task.priority > existingTaskPriority) {
        $insertBeforeRow = $row
        return false // Stop iterating
      }
    })

    // Insert the new row into the correct position in the table
    if ($insertBeforeRow) {
      $insertBeforeRow.before(row)
    } else {
      $('#task-list').append(row)
    }

    updateCounts()
    getsortedlist()
    $('form')[0].reset()
  })
})

$('#task-list').on('click', '.complete-link', function (event) {
  event.preventDefault()
  const $link = $(this)
  const taskId = $link.closest('tr').data('id')
  console.log('enterdhere', taskId)
  $.ajax({
    url: `/complete-todo/${taskId}`,
    method: 'PUT',
    success: (task) => {
      console.log(task)
      const row = $(`tr[data-id="${task.data.todoid}"]`)
      row.find('td:nth-child(4)').html('[&#x2714;]')
      updateCounts()
      // getsortedlist()
    },
    error: (xhr, status, error) => {
      console.log(`Error completing task ${taskId}: ${error}`)
    },
  })
})

$('#task-list').on('click', '.cancel-link', function (event) {
  event.preventDefault()
  const $link = $(this)
  const taskId = $link.closest('tr').data('id')
  console.log('enterdhere', taskId)
  $.ajax({
    url: `/cancel-todo/${taskId}`,
    method: 'PUT',
    success: (task) => {
      console.log(task)
      const row = $(`tr[data-id="${task.data.todoid}"]`)
      row.find('td:nth-child(4)').html('[&#x2716;]')
      updateCounts()
      // getsortedlist()
    },
    error: (xhr, status, error) => {
      console.log(`Error completing task ${taskId}: ${error}`)
    },
  })
})

localStorage.setItem('dcount', 0)
// Retrieve the variable from local storage

$('#task-list').on('click', '.delete-link', function (event) {
  event.preventDefault()
  const $link = $(this)
  const taskId = $link.closest('tr').data('id')
  console.log('entered here', taskId)
  $.ajax({
    url: `/delete-todo/${taskId}`,
    method: 'DELETE',
    success: (task) => {
      console.log(task)
      const row = $(`tr[data-id="${task.data.todoid}"]`)
      row.remove()
      const val = parseInt(localStorage.getItem('dcount'))
      localStorage.setItem('dcount', val + 1)
      // console.log(localStorage.getItem('dcount'))
      updateCounts()
    },
    error: (xhr, status, error) => {
      console.log(`Error completing task ${taskId}: ${error}`)
    },
  })
})

function updateCounts() {
  $.ajax({
    url: '/count-todo',
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      console.log(response)

      $('#total-count').text(response.data.total)
      $('#pending-count').text(response.data.pending)
      $('#canceled-count').text(response.data.canceled)
      $('#deleted-count').text(localStorage.getItem('dcount'))
      $('#completed-count').text(response.data.completed)
    },
    error: function (xhr, status, error) {
      console.log('Error: ' + error.message)
    },
  })
}

function getStatusIcon(task) {
  console.log('ingettaxk', task)
  if (task.completed) {
    return '[&#x2714;]'
  } else if (task.canceled) {
    return '[&#x2716;]'
  } else {
    return '[&nbsp;&nbsp;&nbsp;]'
  }
}

function getsortedlist() {
  $.get('/sort-todo', (data) => {
    const res = data.data
    console.log(res)
    const $list = $('#task-list2')
    Object.keys(res).forEach((status) => {
      const tasks = res[status]

      tasks.forEach((task, index) => {
        $list.append(`
      <tr data-id="${task._id}">
        <td>${index + 1}</td>
        <td>${task.description}</td>
        <td>${task.priority}</td>
        <td>${getStatusText(task)}</td>
      </tr>
    `)
      })
    })
  })
}

function getStatusText(task) {
  console.log(task)
  if (task.completed) {
    return 'Completed'
  } else if (task.canceled) {
    return 'Canceled'
  } else if (task.deleted) {
    return 'Deleted'
  } else {
    return 'Pending'
  }
}
