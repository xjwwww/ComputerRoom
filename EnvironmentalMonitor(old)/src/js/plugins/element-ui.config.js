import Vue from 'vue'

import {
    Pagination,
    Dialog,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Col,
    Carousel,
    CarouselItem,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    Button,
    Table,
    TableColumn,
    TimePicker,
    DatePicker,
    Progress,
    Popover,
    // Tooltip,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Icon,
    Badge,
    Cascader,
    // Divider,
    Image,
    Loading,
    MessageBox,
    Message,
    // Notification
  } from 'element-ui'
  
Vue.use(Progress)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Col)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(TimePicker)
Vue.use(DatePicker)
Vue.use(Popover)
// Vue.use(Tooltip)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Icon)
Vue.use(Badge)
Vue.use(Cascader)
// Vue.use(Divider)
Vue.use(Image)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert=MessageBox.alert
Vue.prototype.$message = Message
// Vue.prototype.$notify = Notification

// import 'element-ui/lib/theme-chalk/fonts/element-icons.ttf'
// import 'element-ui/lib/theme-chalk/fonts/element-icons.woff'
// import 'element-ui/lib/theme-chalk/base.css'
// import 'element-ui/lib/theme-chalk/checkbox.css'
// import 'element-ui/lib/theme-chalk/message.css'
// import 'element-ui/lib/theme-chalk/badge.css'
// import 'element-ui/lib/theme-chalk/col.css'
// import 'element-ui/lib/theme-chalk/carousel.css'
// import 'element-ui/lib/theme-chalk/carousel-item.css'
// import 'element-ui/lib/theme-chalk/checkbox.css'
// import 'element-ui/lib/theme-chalk/checkbox-button.css'
// import 'element-ui/lib/theme-chalk/checkbox-group.css'
// import 'element-ui/lib/theme-chalk/dialog.css'
// import 'element-ui/lib/theme-chalk/divider.css'
// import 'element-ui/lib/theme-chalk/form.css'
// import 'element-ui/lib/theme-chalk/form-item.css'
// import 'element-ui/lib/theme-chalk/icon.css'
// import 'element-ui/lib/theme-chalk/image.css'
// import 'element-ui/lib/theme-chalk/input.css'
// import 'element-ui/lib/theme-chalk/input-number.css'
// import 'element-ui/lib/theme-chalk/loading.css'
// import 'element-ui/lib/theme-chalk/message-box.css'
// import 'element-ui/lib/theme-chalk/message.css'
// // import 'element-ui/lib/theme-chalk/notification.css'
// import 'element-ui/lib/theme-chalk/option.css'
// import 'element-ui/lib/theme-chalk/pagination.css'
// import 'element-ui/lib/theme-chalk/popover.css'
// import 'element-ui/lib/theme-chalk/radio.css'
// import 'element-ui/lib/theme-chalk/select.css'
// import 'element-ui/lib/theme-chalk/select-dropdown.css'
// import 'element-ui/lib/theme-chalk/switch.css'
// import 'element-ui/lib/theme-chalk/table.css'
// import 'element-ui/lib/theme-chalk/table-column.css'
// import 'element-ui/lib/theme-chalk/tab-pane.css'
// import 'element-ui/lib/theme-chalk/tabs.css'
// import 'element-ui/lib/theme-chalk/tag.css'
// import 'element-ui/lib/theme-chalk/time-picker.css'
// import 'element-ui/lib/theme-chalk/tooltip.css'
// import 'element-ui/lib/theme-chalk/tree.css'