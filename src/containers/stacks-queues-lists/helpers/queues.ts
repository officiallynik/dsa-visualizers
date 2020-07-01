export const handleEnQ = (setOpt: Function) => {
    let len = document.getElementsByClassName('queue-element').length   
    let headEl: any = document.getElementsByClassName('queue-element')[len-1]
    let beheadEl: any = document.getElementsByClassName('queue-element')[len-2]
    headEl.classList.remove('tail-element')
    beheadEl.classList.add('head-element')
    let beheadElHTML = beheadEl.innerHTML

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
            document.getElementById('tail-tag')?.remove()
            document.getElementsByClassName('queue-element')[len-1].innerHTML += '<div id="tail-tag">tail</div>'
        }, 500)
    }, 500)

    setOpt(null)
}

export const handleQPeek = () => {
    const headEl = document.getElementsByClassName('queue-element')[0]

    headEl.classList.add('peek-element')

    setTimeout(() => {
        headEl.classList.remove('peek-element')
    }, 2000)
}

export const handleDeQ = (arr: number[], func: Function, setOpt: Function) => {

    let [, , beheadEl, headEl, ]: any = document.getElementsByClassName('queue-element')
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
            document.getElementsByClassName('queue-element')[2].innerHTML += '<div id="head-tag">head</div>'
            document.getElementsByClassName('queue-element')[document.getElementsByClassName('queue-element').length-1].innerHTML += '<div id="tail-tag">tail</div>'
        }, 500)
    }, 500)

    setOpt(null)
}

export const handleQCreate = async (setState: Function) => {
    let arr: number[] = []
    for(let i=0; i<5; i++){
        arr.push(Math.floor(Math.random() * 100))
    }
    await setState(arr)

    document.getElementsByClassName('queue-element')[2].innerHTML += '<div id="head-tag">head</div>'
    document.getElementsByClassName('queue-element')[document.getElementsByClassName('queue-element').length-1].innerHTML += '<div id="tail-tag">tail</div>'
}