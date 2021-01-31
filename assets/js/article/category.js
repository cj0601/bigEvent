$(function () {

    getCateList()
    // 获取数据
    function getCateList() {

        axios.get('/my/article/cates').then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取文章数据失败')
            }

            const htmlStr = template('tpl-table', res)
            // console.log(htmlStr);
            $('tbody').html(htmlStr)
        })
    }

    var indexAdd = null
    // 添加分类的点击事件
    $('.layui-btn').click(function () {

        // 为添加类别按钮绑定点击事件
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })


    })

    // 3 监听 添加表单的提交事件
    // 要使用 事件委托on 方法
    $(document).on('submit', '.add-form', function (e) {
        e.preventDefault()


        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                getCateList()
                layer.msg('新增分类成功！')
                // 根据索引，关闭对应的弹出层（so，打开弹出层时要保存其索引）
                layer.close(indexAdd)
            }
        })

    })

    $(document).on('click', '.form-add', function (e) {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
    })


    console.log($(this).data('id'));
    const id = $(this).data('id')
    axios.get(`/my/article/cates/${id}`).then(res => {
        console.log(res);
    })

})