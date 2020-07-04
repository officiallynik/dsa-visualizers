export const handlePush = (setOpt: Function) => {
    let [headEl, beheadEl, ]: any = document.getElementsByClassName('stack-element')
    headEl.classList.remove('head-element')
    beheadEl.classList.add('head-element')
    let beheadElHTML = beheadEl.innerHTML

    beheadEl.innerHTML += '<div>head</div>'

    setTimeout(() => {
        beheadEl.classList.remove('head-element')
        headEl.innerHTML += '<div id="temp-tag">temp</div>'

        beheadEl.classList.add('being-behead')
        headEl.classList.add('being-head')

        setTimeout(() => {
            beheadEl.innerHTML = beheadElHTML
            headEl.classList.add('head-element')
            headEl.classList.remove('being-head')
            beheadEl.classList.remove('being-behead')
            document.getElementById('temp-tag')?.remove()
            document.getElementsByClassName('stack-element')[0].innerHTML += '<div id="head-tag">head</div>'
        }, 500)
    }, 500)

    setOpt(null)
}

export const handlePeek = () => {
    const headEl = document.getElementsByClassName('stack-element')[0]

    headEl.classList.add('peek-element')

    setTimeout(() => {
        headEl.classList.remove('peek-element')
    }, 2000)
}

export const handlePop = (arr: number[], func: Function, setOpt: Function) => {

    let [beheadEl, headEl, ]: any = document.getElementsByClassName('stack-element')
    headEl.classList.add('being-head')
    let beheadELTag = document.getElementById('head-tag')!
    beheadELTag.innerText = 'head/temp'

    setTimeout(() => {
        beheadELTag.innerText = 'temp'
        headEl.innerHTML += '<div id="head-tag">head</div>'
        beheadEl.classList.add('being-behead')
        setTimeout(() => {
            beheadEl.classList.remove('being-behead')
            headEl.classList.remove('being-head')
            arr.shift()
            func(arr)
            document.getElementsByClassName('stack-element')[0].innerHTML += '<div id="head-tag">head</div>'
        }, 500)
    }, 500)

    setOpt(null)
}

export const handleCreate = async (setState: Function) => {
    let arr: number[] = []
    for(let i=0; i<5; i++){
        arr.push(Math.floor(Math.random() * 100))
    }
    await setState(arr)

    document.getElementsByClassName('stack-element')[0].innerHTML += '<div id="head-tag">head</div>'
}