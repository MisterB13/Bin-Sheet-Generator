import { ModList } from "./mod-list.js";

const fileUpload = document.getElementById('file-upload');
const buttonClick = document.querySelector('.input-group');

const FILE_TYPE = 'text/csv';
const NEWLINE = '\r\n';

let processType = '';
let locationFilter = '';

export class CSVReader {
    #reader = new FileReader();
    #modList = new ModList();

    constructor() { this.#listen() }

    #listen() {
        fileUpload.addEventListener('change', this.#readInput.bind(this));
        this.#reader.addEventListener('load', 
            event => {
                //console.log(event.target.result);
                //this.#parseCSVFile(event.target.result);
                this.#modList.sort(event.target.result.split(NEWLINE), processType, locationFilter);
                this.#clearContent();
            });

        buttonClick.addEventListener('click', (event) => {
            fileUpload.click();
            locationFilter = event.target.dataset.regionInfo;
        });
    }

    #clearContent(){
        const element = document.querySelector('.content');

        if(!element.hasChildNodes()) return;

        while (element.firstChild) 
            element.removeChild(element.firstChild);
    }

    #readInput() {
        const upload = fileUpload.files[0];
        console.log(upload);

        if(upload.type !== FILE_TYPE) {
            console.log(`Invalid File Type - ${upload.type}`); //filter for correct file type
            return;
        } 

        if(upload.size == 0) {
            console.log('File contains no information'); //filter for correct file size
            return;
        }
        
        processType = (upload.name.startsWith('pendingStow') ? 'STOW' : 'PULL'); // includes allEmptyBins as PULL

        this.#readCSVFile(upload);      
        fileUpload.value = null;
    }

    #readCSVFile(file) {
        if(!this.#reader) {
            console.log('FileReader not found');
            return;
        }      
        this.#reader.readAsText(file);   
    }

    // #parseCSVFile(text) {
    //     const NEWLINE = '\r\n';

    //     this.#modList.sort(text.split(NEWLINE), processType, locationFilter);
    // }   
}