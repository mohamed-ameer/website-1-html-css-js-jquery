$(window).on('load', function () {    
    'use strict';   
    $('.loader-container').fadeOut(2000);   
});
let section =document.querySelectorAll('section');
let navLinks=document.querySelectorAll("nav .list li a");
let navToggleLinks=document.querySelectorAll("nav .toggle-list li a");
navToggleLinks.forEach(link =>{
    link.addEventListener('click',()=>{
        $('nav .toggle').click()
    })
});
$(document).ready(function(){
    // navbar spy
    $(window).on('load',()=>{
        // $(window).scrollTop(0)
        if ($(window).scrollTop() >= 137) {
            $('.navbar').css({
                'backgroundColor' : '#051024',
                'boxShadow' : 'rgb(0, 0, 0) 5px 0px 5px',
                'paddingTop' : '10px',
                'paddingBottom' : '10px'
            });
        } else {
            $('.navbar').css({
    
                'backgroundColor' : 'transparent',
                'boxShadow' : 'none',
                'paddingTop' : '1.563rem',
                'paddingBottom' : '1.563rem'
            });
        }   
    })
    $(window).scroll(function () { 
        if ($(window).scrollTop() >= 137) {
            $('.navbar').css({
                'backgroundColor' : '#051024',
                'boxShadow' : 'rgb(0, 0, 0) 5px 0px 5px',
                'paddingTop' : '10px',
                'paddingBottom' : '10px'
            });
        } else {
            $('.navbar').css({
    
                'backgroundColor' : 'transparent',
                'boxShadow' : 'none',
                'paddingTop' : '1.563rem',
                'paddingBottom' : '1.563rem'
            });
        }   
        section.forEach(sec =>{
            let top = window.scrollY;
            let offset = sec.offsetTop - 100;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');
            if(top >= offset && top < offset + height){
                navLinks.forEach(link =>{
                    link.classList.remove('active');
                    document.querySelector(`nav .list li a[href *= ${id}]`).classList.add('active')
                });
                navToggleLinks.forEach(link =>{
                    link.classList.remove('active');
                    document.querySelector(`nav .toggle-list li a[href *= ${id}]`).classList.add('active')
                });
            }
        }); 
    });
    // smooth scroll
    $('a[href^="#"]').click(function(e) {  	
        e.preventDefault();
        var targetHref = $(this).attr('href');        
        $('html, body').animate({
            scrollTop: $(targetHref).offset().top - 70
        },1500);      
    });
    // nav burger
    $('nav .toggle').click(function() {
        $('.navbar').css({
            'backgroundColor' : '#051024',
            'boxShadow' : 'rgb(0, 0, 0) 5px 0px 5px',
            'paddingTop' : '10px',
            'paddingBottom' : '10px'
        });
        $( ".toggle-list" ).toggleClass('active2');
    
      });
    // hidden search bar  
    $('.search-icon').click(function() {
        $( ".search-bar" ).toggleClass('active3');
      });
    // music sections
    $('.buttons').click((e)=>{
        $('.buttons button').each((i,btn)=>{
            btn.classList.remove('active-btn')
        })
        e.target.classList.add('active-btn')
        // let sectionClass = e.target.getAttribute("id");
        // $(`.${sectionClass}`).fadeIn();
    })
    //slider 
    $('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:false
        },
        1000:{
            items:5,
            nav:true,
            loop:false
        }
    }})
    //triger nice scroll
    $(function () {
        $("body").niceScroll({
            cursorcolor: "#FF275E",
            cursorwidth: "8px",
            cursorborder: "none",
            zindex: "9999"
        });
    });
})
// audio playing
let currentMusic =0;
const music =document.querySelector('#audio');
const seekBar =document.querySelector('.seek-bar');
const songName =document.querySelector('.music-name');
const artistName =document.querySelector('.artist-name');
const disk =document.querySelector('.disk');
const currentTime =document.querySelector('.current-time');
const musicDuration =document.querySelector('.song-duration');
const playBtn =document.querySelector('.play-btn');
const forwardBtn =document.querySelector('.forward-btn');
const backwardBtn =document.querySelector('.backward-btn');

playBtn.addEventListener('click',()=>{
    if (playBtn.classList.contains('pause')) {
        music.play();
    } else {
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play')
})
setInterval(()=>{
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
        forwardBtn.click();
    }
},500);
seekBar.addEventListener('change',()=>{
    music.currentTime = seekBar.value;
})
// setup music
const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src=song.path;
    songName.innerHTML=song.name;
    artistName.innerHTML=song.artist;
    disk.style.backgroundImage=`url('${song.cover}')`;
    currentTime.innerHTML='00:00'
    setTimeout(()=>{
        seekBar.max=music.duration;
        musicDuration.innerHTML=formatTime(music.duration);
    },300)
}
setMusic(0);
const formatTime = (time) => {
    let min = Math.floor(time/60);
    if(min < 10){
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`
    }
    return `${min} : ${sec}`
}
// forward and backward
const playMusic = ()=>{
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.remove('play')
}
forwardBtn.addEventListener('click',()=>{
    if (currentMusic >= songs.length) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})
backwardBtn.addEventListener('click',()=>{
    if (currentMusic <= 0) {
        currentMusic = songs.length -1;
    } else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
})
// ///////
// video-player
// /////
