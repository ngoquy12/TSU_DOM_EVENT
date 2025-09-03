// Lấy các phần tử trong DOM
const formElement = document.getElementById("form");
const inputNameElement = document.getElementById("inputName");
const inputAgeElement = document.getElementById("inputAge");
const inputClassElement = document.getElementById("inputClass");
const tbodyElement = document.getElementById("tbody");
const btnSubmit = document.getElementById("btn-submit");

const students = [];
let type = "add";
let indexEdit = null;

// Hàm render danh sách sinh viên
function renderStudent() {
  // Duyệt qua mảng students và chỉnh sửa mảng đó
  const studentMaps = students.map(function (element, index) {
    return `
            <tr>
                <td>${index + 1}</td>
                <td>${element.name}</td>
                <td>${element.age}</td>
                <td>${element.className}</td>
                <td>
                <button onclick='handleEdit(${
                  element.id
                }, ${index})'>Sửa</button>
                <button onclick="handleDelete(${element.id})">Xóa</button>
                </td>
            </tr>
        `;
  });

  // Chuyển đổi mảng thành chuỗi HTMML
  const convertStudents = studentMaps.join("");

  // Gán chuỗi HTML vào trong DOM (thẻ tbody)
  tbodyElement.innerHTML = convertStudents;
}

renderStudent();

// Hàm reset các giá trị trong input
function resetInputs() {
  inputNameElement.value = "";
  inputAgeElement.value = "";
  inputClassElement.value = "";
}

// Bắt sự kiện submit form
formElement.addEventListener("submit", function (event) {
  // Ngăn chặn sự kiện load lại trang
  event.preventDefault();

  // Validate dữ liệu
  if (
    inputNameElement.value &&
    inputAgeElement.value &&
    inputClassElement.value
  ) {
    if (type === "add") {
      // Tạo ra một đối tượng sinh viên mới chứa giá trị từ input
      const student = {
        id: Math.ceil(Math.random() * 1000000),
        name: inputNameElement.value,
        age: inputAgeElement.value,
        className: inputClassElement.value,
      };

      // Thêm phần tử vào trong mảng
      students.push(student);
    } else {
      // Cập nhật lại thông tin các trường
      students[indexEdit].name = inputNameElement.value;
      students[indexEdit].age = inputAgeElement.value;
      students[indexEdit].className = inputClassElement.value;

      // Cập nhật lại type và indexEdit
      type = "add";

      indexEdit = null;

      // Thay đổi tiêu đề của button
      btnSubmit.textContent = "Thêm sinh viên";
    }

    // Sau khi thêm mới, tiến hành render lại dữ liệu
    renderStudent();

    // Reset giá trị trong các ô input
    resetInputs();
  }
});

// Hàm xóa sinh viên theo id
function handleDelete(id) {
  // Tìm ra vị trí của phần tử trong mảng
  const findIndexStudent = students.findIndex(function (element) {
    if (element.id === id) {
      return element;
    }
  });

  if (findIndexStudent !== -1) {
    // Hàm slices
    students.splice(findIndexStudent, 1);

    // Gọi hàm render lại dữ liệu
    renderStudent();
  }
}

// Hàm sửa thông tin sinh viên
function handleEdit(id, index) {
  // Thay đổi tiêu đề của button
  btnSubmit.textContent = "Sửa sinh viên";

  // Tìm kiếm sinh viên trong mảng theo id
  const findStudent = students.find(function (element) {
    if (element.id === +id) {
      return element;
    }
  });

  // Gán lại giá trị của bản ghi vào trong input
  inputNameElement.value = findStudent.name;
  inputAgeElement.value = findStudent.age;
  inputClassElement.value = findStudent.className;

  // Cập nhật lại loại của button
  type = "edit";

  // Cập nhật lại vị trí cần chỉnh sửa
  indexEdit = index;
}
