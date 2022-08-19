export default class Tabs {
    constructor(tabsSelector, сontentSelector, activeTabSelector, activeTabContentSelector){   
        this._tabsContainer = document.querySelector(tabsSelector);
        this._tabsContentContainer = document.querySelector(сontentSelector);

        this._tabsList = Array.from(this._tabsContainer.children);
        this._tabsContentList = Array.from(this._tabsContentContainer.children);

        this._activeTabSelector = activeTabSelector;
        this._activeTabContentSelector = activeTabContentSelector;

        this._activeTab = this._tabsContainer.querySelector(`.${this._activeTabSelector}`);
        this._activeTabContent = this._tabsContentContainer.querySelector(`.${this._activeTabContentSelector}`);
    }

    _changeTab(tab){
        this._activeTab.classList.remove(this._activeTabSelector);
        this._activeTabContent.classList.remove(this._activeTabContentSelector);       

        this._activeTab = tab;
        this._activeTabContent = this._tabsContentContainer.querySelector(`#${tab.id}`);

        this._activeTab.classList.add(this._activeTabSelector);
        this._activeTabContent.classList.add(this._activeTabContentSelector);
    }

    setListeners(){
        this._tabsList.forEach(tab => {
            tab.addEventListener('click', (event) =>{
                event.preventDefault();
                this._changeTab(event.target);
            })
        }) 
    }
}

