'use strict';
export class CustomTabs {
    constructor(initiate, targets){
        this._selectors = document.querySelectorAll(initiate);
        this._targets = document.querySelectorAll(targets);
        this._activeClass = 'active';
        this._showClass = 'show';
    }
    init(){
        if(this._selectors === null) return false;
        this._selectors.forEach(selector => {
            selector.classList.contains(this._activeClass) ? this._activateTab(selector.getAttribute("href").replace(/#/g, '')) : '';
            selector.addEventListener("click", (e) => {
                e.preventDefault();
                this._activateTab(e.currentTarget.getAttribute('href').replace(/#/g, ''));
            });
        })
    }
    _activateTab(id){
        this._selectors.forEach(selector => {
            if(selector.getAttribute('href') === `#${id}`){
                selector.classList.add(this._activeClass);
                
            }else{
                selector.classList.remove(this._activeClass)
            }
        });
        this._targets.forEach(target => {
            if(target.getAttribute("id") === id){
                target.classList.add(this._activeClass);
                setTimeout(() => {target.classList.add(this._showClass);});
            }else{
                target.classList.remove(this._activeClass);
                setTimeout(() => {target.classList.remove(this._showClass);});
            }
        })
    }

}