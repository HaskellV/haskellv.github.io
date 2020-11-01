const head = document.querySelector('#img-head')
const subscription = document.querySelector('#text-subscription')
const nick = document.querySelector('#text-nick')
const time = document.querySelector('#text-time')
const search = document.querySelector('#search')
const blur = document.querySelector(".blur")
const noPlayer = document.querySelector("#noPlayerFound")


const subscriptionKeys = [
    {key: 'diamond', name: 'Diamentowy'},
    {key: 'emerald', name: 'Emeraldowy'},
    {key: 'gold', name: 'Złoty'},
    {key: 'iron', name: 'Żelazny'},
]


const handleInput = (event) => {
    blur.style.display = 'flex'
    fetch(`https://mc.skript.pl/api/player/${event.target.value}?by=nick`)
        .then(response => response.json())
        .then(data => {
            setInfo(data)
        }).catch(err => {
            
            setInfo()
            
        })
}

const setInfo = (data) => {
    noPlayer.style.display = data ? 'none' : 'block'
    head.src = `https://minotar.net/helm/${data?.nick || "connor4312"}/120`
    subscription.textContent = data ? subscriptionKeys.find(key => key.key == data.subscription.key).name : "???"
    nick.innerHTML = prepareCustomNick({'subscription': data?.subscription.key, nick: data?.nick, customNick: data?.customNick})
    time.textContent = data?.logged ? moment(data?.logged).utc().format('DD/mm/YYYY HH:mm:ss') : data?.nick ? "Nigdy" : "???"

    subscriptionKeys.forEach(item => {
        subscription.classList.remove(`abonament-${item.key}`)
    })
    data?.subscription.key ? subscription.classList.add(`abonament-${data.subscription.key || 'iron'}`) : ''
    blur.style.display = 'none'
}

search.addEventListener('input', debounce(handleInput, 1500))



const prepareCustomNick = (player) => {
    console.log(player)
    let text = ""
    if (player.subscription == "iron" || player.subscription == "emerald") text = `&a${player.nick}`
    if (player.subscription == "gold") text = `&6${player.nick}`
    if (player.subscription == "diamond") text = player.customNick || player.nick
    console.log(text)
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