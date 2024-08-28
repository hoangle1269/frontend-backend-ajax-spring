// function addNewSmartPhone() {
//     //lấy dữ liệu từ form html
//     let producer = $('#producer').val();
//     let model = $('#model').val();
//     let price = $('#price').val();
//     let newSmartphone = {
//         producer: producer,
//         model: model,
//         price: price
//     };
//     // gọi phương thức ajax
//     $.ajax({
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         type: "POST",
//         data: JSON.stringify(newSmartphone),
//         //tên API
//         url: "http://localhost:8080/api/smartphones",
//         //xử lý khi thành công
//         success: successHandler
//
//     });
//     //chặn sự kiện mặc định của thẻ
//     event.preventDefault();
// }

function addOrUpdateSmartphone() {
    let id = $('#id').val();
    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();
    let newSmartphone = {
        producer: producer,
        model: model,
        price: price
    };

    let url = "http://localhost:8080/api/smartphones";
    let type = "POST";

    if (id) {  // Nếu đã có ID, nghĩa là đang trong quá trình chỉnh sửa
        url += `/${id}/update`;
        type = "PUT";
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: type,
        data: JSON.stringify(newSmartphone),
        url: url,
        success: successHandler
    });

    event.preventDefault();
}

function successHandler() {
    $.ajax({
        type: "GET",
        //tên API
        url: "http://localhost:8080/api/smartphones",
        //xử lý khi thành công
        success: function (data) {
            // hiển thị danh sách ở đây
            let content = '    <table id="display-list"  border="1"><tr>\n' +
                '        <th>Producer</td>\n' +
                '        <th>Model</td>\n' +
                '        <th>Price</td>\n' +
                '        <th>Delete</td>\n' +
                '    </tr>';
            for (let i = 0; i < data.length; i++) {
                content += getSmartphone(data[i]);
            }
            content += "</table>"
            document.getElementById('smartphoneList').innerHTML = content;
            document.getElementById('smartphoneList').style.display = "block";
            document.getElementById('add-smartphone').style.display = "none";
            document.getElementById('display-create').style.display = "block";
            document.getElementById('title').style.display = "block";
        }
    });
}

function displayFormCreate() {
    document.getElementById('smartphoneList').style.display = "none";
    document.getElementById('add-smartphone').style.display = "block";
    document.getElementById('display-create').style.display = "none";
    document.getElementById('title').style.display = "none";
}

function getSmartphone(smartphone) {
    return `<tr>
<td >${smartphone.producer}</td><td >${smartphone.model}</td><td >${smartphone.price}</td>` +
        `<td class="btn"><button class="deleteSmartphone" onclick="deleteSmartphone(${smartphone.id})">Delete</button></td></tr>`;
}

function deleteSmartphone(id) {
    $.ajax({
        type: "DELETE",
        //tên API
        url: `http://localhost:8080/api/smartphones/${id}`,
        //xử lý khi thành công
        success: successHandler
    });
}

// function updateSmartphone() {
//     let id = $('#id').val();
//     let producer = $('#producer').val();
//     let model = $('#model').val();
//     let price = $('#price').val();
//     let newSmartphone = {
//         producer: producer,
//         model: model,
//         price: price
//     };
//     // gọi phương thức ajax
//     $.ajax({
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         type: "PUT",
//         data: JSON.stringify(newSmartphone),
//         //tên API
//         url: `http://localhost:8080/api/smartphones/${id}/update`,
//         //xử lý khi thành công
//         success: successHandler
//
//     });
//     //chặn sự kiện mặc định của thẻ
//     event.preventDefault();
// }

function editSmartphone(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/smartphones/${id}`,
        success: function (data) {
            $('#id').val(data.id);
            $('#producer').val(data.producer);
            $('#model').val(data.model);
            $('#price').val(data.price);
            $('#form-title').text("Form Edit");
            $('#display-create').hide();
            $('#add-smartphone').show();
        }
    });
}

function searchSmartphone() {
    let id = $('#id').val();
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/smartphones/${id}`,
        success: function (data) {
            let content = '<table id="display-list" border="1"><tr>\n' +
                '    <th>Producer</th>\n' +
                '    <th>Model</th>\n' +
                '    <th>Price</th>\n' +
                '    <th>Edit</th>\n' +
                '    <th>Delete</th>\n' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += getSmartphone(data[i]);
            }
            content += "</table>";
            $('#smartphoneList').html(content);
            $('#smartphoneList').show();
        }
    });
}

function getSmartphone(smartphone) {
    return `<tr>
<td>${smartphone.producer}</td>
<td>${smartphone.model}</td>
<td>${smartphone.price}</td>
<td><button onclick="editSmartphone(${smartphone.id})">Edit</button></td>
<td><button class="deleteSmartphone" onclick="deleteSmartphone(${smartphone.id})">Delete</button></td>
</tr>`;
}

function searchSmartphoneByProducer() {
    let producer = $('#search-producer').val();
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/smartphones/producer/${producer}`,
        success: function (data) {
            let content = '<table id="display-list" border="1"><tr>\n' +
                '    <th>Producer</th>\n' +
                '    <th>Model</th>\n' +
                '    <th>Price</th>\n' +
                '    <th>Edit</th>\n' +
                '    <th>Delete</th>\n' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += getSmartphone(data[i]);
            }
            content += "</table>";
            $('#smartphoneList').html(content);
            $('#smartphoneList').show();
        }
    });
}