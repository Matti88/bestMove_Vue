


import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'prismjs/themes/prism-coy.css';
import './assets/styles/layout.scss';
import './assets/demo/flags/flags.css';

import { createApp, reactive } from 'vue';
import router from './router';
import AppWrapper from './AppWrapper.vue';
import PrimeVue from 'primevue/config';
import AutoComplete from 'primevue/autocomplete';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import Badge from 'primevue/badge';
import BadgeDirective from 'primevue/badgedirective';
import Button from 'primevue/button';
import Breadcrumb from 'primevue/breadcrumb';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import Carousel from 'primevue/carousel';
import Chart from 'primevue/chart';
import Checkbox from 'primevue/checkbox';
import Chip from 'primevue/chip';
import Chips from 'primevue/chips';
import ColorPicker from 'primevue/colorpicker';
import Column from 'primevue/column';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';
import ContextMenu from 'primevue/contextmenu';
import DataTable from 'primevue/datatable';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import Fieldset from 'primevue/fieldset';
import FileUpload from 'primevue/fileupload';
import Image from 'primevue/image';
import InlineMessage from 'primevue/inlinemessage';
import Inplace from 'primevue/inplace';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Knob from 'primevue/knob';
import Galleria from 'primevue/galleria';
import Listbox from 'primevue/listbox';
import MegaMenu from 'primevue/megamenu';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar';
import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';
import OrderList from 'primevue/orderlist';
import OrganizationChart from 'primevue/organizationchart';
import OverlayPanel from 'primevue/overlaypanel';
import Paginator from 'primevue/paginator';
import Panel from 'primevue/panel';
import PanelMenu from 'primevue/panelmenu';
import Password from 'primevue/password';
import PickList from 'primevue/picklist';
import ProgressBar from 'primevue/progressbar';
import Rating from 'primevue/rating';
import RadioButton from 'primevue/radiobutton';
import Ripple from 'primevue/ripple';
import SelectButton from 'primevue/selectbutton';
import ScrollPanel from 'primevue/scrollpanel'
import ScrollTop from 'primevue/scrolltop';
import Slider from 'primevue/slider';
import Sidebar from 'primevue/sidebar';
import Skeleton from 'primevue/skeleton';
import SplitButton from 'primevue/splitbutton';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Steps from 'primevue/steps';
import StyleClass from 'primevue/styleclass';
import TabMenu from 'primevue/tabmenu';
import Tag from 'primevue/tag';
import TieredMenu from 'primevue/tieredmenu';
import Textarea from 'primevue/textarea';
import Timeline from 'primevue/timeline';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Toolbar from 'primevue/toolbar';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Tooltip from 'primevue/tooltip';
import ToggleButton from 'primevue/togglebutton';
import Tree from 'primevue/tree';
import TreeSelect from 'primevue/treeselect';
import TreeTable from 'primevue/treetable';
import TriStateCheckbox from 'primevue/tristatecheckbox';

import BlockViewer from './BlockViewer';

import { createPinia } from 'pinia';
import "leaflet/dist/leaflet.css";

import BootstrapVue3 from "bootstrap-vue-3";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import axios from 'axios';


//setting for axios
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000/';  // the FastAPI backend


//creating app instanse
const app = createApp(AppWrapper);


//setting app configurations
app.config.productionTip = false;
app.config.globalProperties.$appState = reactive({ theme: 'lara-light-indigo', darkTheme: false });

app.use(PrimeVue, { ripple: true, inputStyle: 'outlined' });
app.use(ConfirmationService);
app.use(ToastService);
app.use(router);

app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);
app.directive('badge', BadgeDirective);
app.directive('styleclass', StyleClass);


app.component('PrimeAccordion', Accordion);
app.component('PrimeAccordionTab', AccordionTab);
app.component('PrimeAutoComplete', AutoComplete);
app.component('PrimeAvatar', Avatar);
app.component('PrimeAvatarGroup', AvatarGroup);
app.component('PrimeBadge', Badge);
app.component('PrimeBreadcrumb', Breadcrumb);
app.component('PrimeButton', Button);
app.component('PrimeCalendar', Calendar);
app.component('PrimeCard', Card);
app.component('PrimeCarousel', Carousel);
app.component('PrimeChart', Chart);
app.component('PrimeCheckbox', Checkbox);
app.component('PrimeChip', Chip);
app.component('PrimeChips', Chips);
app.component('PrimeColorPicker', ColorPicker);
app.component('PrimeColumn', Column);
app.component('PrimeConfirmDialog', ConfirmDialog);
app.component('PrimeConfirmPopup', ConfirmPopup);
app.component('PrimeContextMenu', ContextMenu);
app.component('PrimeDataTable', DataTable);
app.component('PrimeDataView', DataView);
app.component('PrimeDataViewLayoutOptions', DataViewLayoutOptions);
app.component('PrimeDialog', Dialog);
app.component('PrimeDivider', Divider);
app.component('PrimeDropdown', Dropdown);
app.component('PrimeFieldset', Fieldset);
app.component('PrimeFileUpload', FileUpload);
app.component('PrimeImage', Image);
app.component('PrimeInlineMessage', InlineMessage);
app.component('PrimeInplace', Inplace);
app.component('PrimeInputMask', InputMask);
app.component('PrimeInputNumber', InputNumber);
app.component('PrimeInputSwitch', InputSwitch);
app.component('PrimeInputText', InputText);
app.component('PrimeGalleria', Galleria);
app.component('PrimeKnob', Knob);
app.component('PrimeListbox', Listbox);
app.component('PrimeMegaMenu', MegaMenu);
app.component('PrimeMenu', Menu);
app.component('PrimeMenubar', Menubar);
app.component('PrimeMessage', Message);
app.component('PrimeMultiSelect', MultiSelect);
app.component('PrimeOrderList', OrderList);
app.component('PrimeOrganizationChart', OrganizationChart);
app.component('PrimeOverlayPanel', OverlayPanel);
app.component('PrimePaginator', Paginator);
app.component('PrimePanel', Panel);
app.component('PrimePanelMenu', PanelMenu);
app.component('PrimePassword', Password);
app.component('PrimePickList', PickList);
app.component('PrimeProgressBar', ProgressBar);
app.component('PrimeRadioButton', RadioButton);
app.component('PrimeRating', Rating);
app.component('PrimeSelectButton', SelectButton);
app.component('PrimeScrollPanel', ScrollPanel);
app.component('PrimeScrollTop', ScrollTop);
app.component('PrimeSlider', Slider);
app.component('PrimeSidebar', Sidebar);
app.component('PrimeSkeleton', Skeleton);
app.component('PrimeSplitButton', SplitButton);
app.component('PrimeSplitter', Splitter);
app.component('PrimeSplitterPanel', SplitterPanel);
app.component('PrimeSteps', Steps);
app.component('PrimeTabMenu', TabMenu);
app.component('PrimeTabView', TabView);
app.component('PrimeTabPanel', TabPanel);
app.component('PrimeTag', Tag);
app.component('PrimeTextarea', Textarea);
app.component('PrimeTieredMenu', TieredMenu);
app.component('PrimeTimeline', Timeline);
app.component('PrimeToast', Toast);
app.component('PrimeToolbar', Toolbar);
app.component('PrimeToggleButton', ToggleButton);
app.component('PrimeTree', Tree);
app.component('PrimeTreeSelect', TreeSelect);
app.component('PrimeTreeTable', TreeTable);
app.component('PrimeTriStateCheckbox', TriStateCheckbox);


app.use(BootstrapVue3);

//adding pinia before router
app.use(createPinia())

app.component('BlockViewer', BlockViewer);

app.mount('#app');


