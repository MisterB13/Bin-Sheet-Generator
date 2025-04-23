export class RenderList {
    #createElement(tag, classesToAdd, content){
        const element = document.createElement(tag);
        if(classesToAdd && classesToAdd.length > 0) 
            classesToAdd.forEach(item => element.classList.add(item));

        if(content)
            element.innerHTML = content;

        return element;
    }

    #createComponent(container, parent, children) {
        children.forEach(child =>  parent.append(child));
        container.append(parent);
    }

    render(listOfMods) {     
        for (const mod of listOfMods) {
            if(mod.bins.length == 0) continue;

            const container = this.#createElement('div', ['bin-list-container']);
          
            let content = `${mod.area.location} - ${mod.bins.length} - ${mod.processType}`
            const header = this.#createElement('h2', ['bin-list-header'], content);

            content = '';
            for (const prop in mod.binTypes) {
                if(!mod.binTypes[prop] == 0)
                    content += `${prop.slice(0, 1)} - ${mod.binTypes[prop]}`
            }

            const infoTag = this.#createElement('p', [], content)
            const ul = this.#createElement('ul', ['bin-list']);
            //ul.style.columns = 7;

            content = mod.bins.forEach(bin => {
                const li = this.#createElement('li', ['list-item'], bin);
                ul.append(li);
            });

            const list = document.querySelector('.content');
            this.#createComponent(list, container, [header, infoTag, ul]);
        }
        this.#checkContent();
    }

    #checkContent() {
        const listElement = document.querySelector('.content');

        if(listElement.hasChildNodes())
            window.print();
        else
            console.log('No bin IDs found.');
        //window.onafterprint(() => {});
    }
}

