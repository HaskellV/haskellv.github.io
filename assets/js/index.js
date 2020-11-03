const head = document.querySelector('#img-head')
const subscription = document.querySelector('#text-subscription')
const nick = document.querySelector('#text-nick')
const time = document.querySelector('#text-time')
const search = document.querySelector('#search')
const blur = document.querySelector(".blur")
const noPlayer = document.querySelector("#noPlayerFound")
const friendsContainer = document.querySelector("#friends-container")
const friendsSection = document.querySelector("#friends-section")


const subscriptionKeys = [
    {key: 'diamond', name: 'Diamentowy'},
    {key: 'emerald', name: 'Emeraldowy'},
    {key: 'gold', name: 'Złoty'},
    {key: 'iron', name: 'Żelazny'},
    {key: 'friend', name: 'Zaproszenie'},
]


const handleInput = (event) => {
    blur.style.display = 'flex'
    fetch(`https://mc.skript.pl/api/player/${event.target.value}?by=nick`)
        .then(response => response.json())
        .then(data => {
            fetch(`https://mc.skript.pl/api/player/${event.target.value}/friends?by=nick`)
                .then(fResponse => fResponse.json())
                .then(fData => {
                    setInfo(data, fData)
                })
        }).catch(err => {
            
            setInfo()
            
        })
}

const setInfo = (data, fData) => {
    noPlayer.style.display = data ? 'none' : 'block'
    friendsContainer.innerHTML = ""
    friendsSection.style.display = 'none'


    head.src = `https://minotar.net/helm/${data?.nick || "connor4312"}/120`
    subscription.textContent = data ? subscriptionKeys.find(key => key.key == data.subscription.key).name : "???"
    nick.innerHTML = prepareCustomNick({'subscription': data?.subscription.key, nick: data?.nick, customNick: data?.customNick}) || '???'
    time.textContent = data?.logged ? moment(data?.logged).utc().format('DD.MM.YYYY HH:mm:ss') : data?.nick ? "Nigdy" : "???"

    subscriptionKeys.forEach(item => {
        subscription.classList.remove(`abonament-${item.key}`)
    })
    data?.subscription.key ? subscription.classList.add(`abonament-${data.subscription.key || 'iron'}`) : ''
    blur.style.display = 'none'

    if(fData?.current.length != 0){
        friendsSection.style.display = 'flex'
    }

    fData?.current.forEach(friend => {
        const div = document.createElement('div')
        div.classList += "tooltip_trigger"

        const img = document.createElement('img')
        img.setAttribute('src', `https://minotar.net/helm/${friend?.friend?.nick}/32`)

        const span = document.createElement('span')
        span.classList += 'tooltip'
        span.textContent = friend?.friend?.nick

        div.append(img)
        div.append(span)

        friendsContainer.append(div)
    })
}

search.addEventListener('input', debounce(handleInput, 1500))



const prepareCustomNick = (player) => {
    let text = ""
    if (player.subscription == "iron" || player.subscription == "emerald" || player.subscription == "friend") text = `&3${player.nick}`
    if (player.subscription == "gold") text = `&6${player.nick}`
    if (player.subscription == "diamond") text = player.customNick || player.nick

    text = text.replace(/&0/gi, '</span><span class="c-1">');
    text = text.replace(/&1/gi, '</span><span class="c-2">');
    text = text.replace(/&2/gi, '</span><span class="c-3">');
    text = text.replace(/&3/gi, '</span><span class="c-4">');
    text = text.replace(/&4/gi, '</span><span class="c-5">');
    text = text.replace(/&5/gi, '</span><span class="c-6">');
    text = text.replace(/&6/gi, '</span><span class="c-7">');
    text = text.replace(/&7/gi, '</span><span class="c-8">');
    text = text.replace(/&8/gi, '</span><span class="c-9">');
    text = text.replace(/&9/gi, '</span><span class="c-10">');
    text = text.replace(/&a/gi, '</span><span class="c-11">');
    text = text.replace(/&b/gi, '</span><span class="c-12">');
    text = text.replace(/&c/gi, '</span><span class="c-13">');
    text = text.replace(/&d/gi, '</span><span class="c-14">');
    text = text.replace(/&e/gi, '</span><span class="c-15">');
    text = text.replace(/&f/gi, '</span><span class="c-16">');
    return text
}


document.addEventListener('DOMContentLoaded', () => {
    if(window.location.hash) {
        search.value = window.location.hash.substring(1)
        search.dispatchEvent(new Event('input') || document.createEvent("HTMLEvents").initEvent('input', false, true))
    }

})