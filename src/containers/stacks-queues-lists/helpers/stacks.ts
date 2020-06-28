export const handlePush = () => {
    let [headEl, beheadEl, _]: any = document.getElementsByClassName('stack-element')
    headEl.classList.remove('head-element')
    beheadEl.classList.add('head-element')
    let headElHTML = headEl.innerHTML
    let beheadElHTML = beheadEl.innerHTML

    beheadEl.innerHTML += '<div>head</div>'

    setTimeout(() => {
        beheadEl.classList.remove('head-element')
        headEl.innerHTML += '<div>temp</div>'

        beheadEl.classList.add('being-behead')
        headEl.classList.add('being-head')

        setTimeout(() => {
            beheadEl.innerHTML = beheadElHTML
            headEl.innerHTML = headElHTML + '<div>head</div>'
            headEl.classList.add('head-element')

            headEl.classList.remove('being-head')
            beheadEl.classList.remove('being-behead')
        }, 500)
    }, 500)
}    

export const handlePeek = () => {
    const headEl = document.getElementsByClassName('stack-element')[0]

    headEl.classList.add('peek-element')

    setTimeout(() => {
        headEl.classList.remove('peek-element')
    }, 2000)
}