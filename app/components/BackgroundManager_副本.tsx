'use client';

import { useState, useEffect } from 'react';

interface BackgroundManagerProps {
  setCurrentBackground: (bg: string) => void;
  triggerRef?: React.MutableRefObject<(() => void) | null>;
}

const backgroundImages = [
  'https://readdy.ai/api/search-image?query=peaceful%20zen%20temple%20courtyard%20with%20stone%20lanterns%20at%20dawn%2C%20traditional%20chinese%20architecture%2C%20misty%20mountains%20in%20background%2C%20soft%20golden%20morning%20light%2C%20minimalist%20composition%20with%20ancient%20pine%20trees%20and%20meditation%20stones&width=1920&height=1080&seq=zen-bg-2&orientation=landscape',
  'https://readdy.ai/api/search-image?query=serene%20bamboo%20forest%20with%20sunlight%20filtering%20through%20leaves%2C%20traditional%20zen%20garden%20path%2C%20peaceful%20meditation%20space%20with%20stone%20arrangements%2C%20soft%20natural%20lighting%2C%20minimalist%20asian%20aesthetic&width=1920&height=1080&seq=zen-bg-3&orientation=landscape',
  'https://readdy.ai/api/search-image?query=tranquil%20lotus%20pond%20at%20sunrise%20with%20morning%20mist%2C%20traditional%20chinese%20pavilion%20in%20distance%2C%20peaceful%20water%20reflection%2C%20soft%20pastel%20colors%2C%20zen%20meditation%20environment%20with%20natural%20harmony&width=1920&height=1080&seq=zen-bg-4&orientation=landscape',
  'https://readdy.ai/api/search-image?query=ancient%20chinese%20temple%20on%20mountain%20peak%20with%20clouds%20below%2C%20traditional%20architecture%20against%20dramatic%20sky%2C%20peaceful%20monastery%20setting%2C%20golden%20hour%20lighting%2C%20spiritual%20meditation%20atmosphere&width=1920&height=1080&seq=zen-bg-5&orientation=landscape',
  'https://images.unsplash.com/photo-1524262134826-05a36ba28ec4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1682685796766-0fddd3e480de?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1709579654090-3f3ca8f8416b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1573035114505-e2a570d94b1b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1674880642932-37b0f951ff9f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1709579654090-3f3ca8f8416b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1725583630737-1caa14afbfb3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1589400554239-7c6cf8393a6e?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1732163627219-39eebb7544f1?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://readdy.ai/api/search-image?query=Zen%20Buddhist%20temple%20mountain%20landscape%20peaceful%20meditation%20garden%20traditional%20Chinese%20architecture%20bamboo%20forest%20morning%20mist%20tranquil%20nature%20scene%20with%20soft%20golden%20lighting%20and%20serene%20atmosphere%20perfect%20for%20spiritual%20contemplation&width=1920&height=1080&seq=1&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Ancient%20Buddhist%20monastery%20nestled%20in%20misty%20mountains%20with%20traditional%20pagoda%20towers%20cherry%20blossoms%20peaceful%20meditation%20courtyard%20stone%20pathways%20morning%20sunlight%20filtering%20through%20trees%20creating%20divine%20spiritual%20atmosphere&width=1920&height=1080&seq=2&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Serene%20Japanese%20zen%20garden%20with%20carefully%20raked%20sand%20patterns%20meditation%20stones%20bamboo%20water%20fountain%20traditional%20wooden%20temple%20architecture%20soft%20morning%20light%20creating%20tranquil%20spiritual%20environment&width=1920&height=1080&seq=3&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Majestic%20Buddhist%20temple%20complex%20on%20mountain%20peak%20surrounded%20by%20clouds%20ancient%20architecture%20golden%20rooftops%20prayer%20flags%20fluttering%20in%20wind%20peaceful%20valley%20below%20spiritual%20pilgrimage%20destination&width=1920&height=1080&seq=4&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Tranquil%20lotus%20pond%20in%20Buddhist%20temple%20garden%20pink%20and%20white%20lotus%20flowers%20blooming%20traditional%20Chinese%20pavilion%20reflection%20in%20still%20water%20morning%20mist%20creating%20peaceful%20meditation%20atmosphere&width=1920&height=1080&seq=5&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Ancient%20Buddhist%20cave%20temple%20carved%20into%20cliff%20face%20meditation%20chambers%20with%20soft%20candlelight%20stone%20Buddha%20statues%20peaceful%20mountain%20valley%20spiritual%20retreat%20for%20contemplation%20and%20prayer&width=1920&height=1080&seq=6&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Sacred%20bodhi%20tree%20in%20temple%20courtyard%20where%20Buddha%20achieved%20enlightenment%20soft%20morning%20light%20filtering%20through%20leaves%20peaceful%20meditation%20spot%20with%20stone%20pathway%20and%20traditional%20architecture&width=1920&height=1080&seq=7&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Himalayan%20Buddhist%20monastery%20with%20colorful%20prayer%20flags%20snow%20capped%20mountains%20traditional%20Tibetan%20architecture%20monks%20in%20meditation%20peaceful%20high%20altitude%20spiritual%20sanctuary%20with%20clear%20blue%20sky&width=1920&height=1080&seq=8&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Peaceful%20river%20flowing%20through%20Buddhist%20temple%20grounds%20traditional%20stone%20bridges%20willow%20trees%20reflecting%20in%20water%20morning%20mist%20creating%20serene%20atmosphere%20for%20meditation%20and%20spiritual%20contemplation&width=1920&height=1080&seq=9&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Golden%20Buddha%20statue%20in%20peaceful%20temple%20hall%20soft%20candlelight%20traditional%20Chinese%20architecture%20ornate%20decorations%20incense%20burning%20creating%20sacred%20atmosphere%20for%20prayer%20and%20meditation&width=1920&height=1080&seq=10&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Mountain%20monastery%20with%20terraced%20gardens%20ancient%20stone%20steps%20leading%20to%20temple%20traditional%20architecture%20surrounded%20by%20pine%20forests%20peaceful%20sunrise%20illuminating%20spiritual%20sanctuary&width=1920&height=1080&seq=11&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Zen%20meditation%20hall%20with%20wooden%20floors%20traditional%20Japanese%20architecture%20paper%20screens%20soft%20natural%20lighting%20peaceful%20atmosphere%20for%20spiritual%20practice%20and%20contemplation&width=1920&height=1080&seq=12&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Sacred%20Buddhist%20stupa%20surrounded%20by%20prayer%20wheels%20colorful%20flags%20traditional%20architecture%20mountain%20backdrop%20peaceful%20pilgrimage%20site%20with%20spiritual%20significance%20and%20meditation%20areas&width=1920&height=1080&seq=13&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Temple%20garden%20with%20ancient%20bonsai%20trees%20carefully%20manicured%20landscape%20traditional%20stone%20lanterns%20peaceful%20meditation%20pathways%20soft%20morning%20light%20creating%20tranquil%20spiritual%20environment&width=1920&height=1080&seq=14&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Buddhist%20temple%20at%20sunset%20golden%20hour%20lighting%20traditional%20pagoda%20architecture%20silhouetted%20against%20colorful%20sky%20peaceful%20mountain%20landscape%20spiritual%20atmosphere%20for%20evening%20meditation&width=1920&height=1080&seq=15&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Peaceful%20bamboo%20grove%20surrounding%20temple%20meditation%20retreat%20natural%20sounds%20of%20wind%20through%20leaves%20traditional%20architecture%20creating%20serene%20environment%20for%20spiritual%20contemplation%20and%20inner%20peace&width=1920&height=1080&seq=16&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Ancient%20Buddhist%20temple%20ruins%20overgrown%20with%20moss%20traditional%20stone%20architecture%20peaceful%20forest%20setting%20morning%20sunlight%20filtering%20through%20trees%20creating%20mystical%20spiritual%20atmosphere&width=1920&height=1080&seq=17&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Temple%20courtyard%20with%20traditional%20Chinese%20architecture%20ornate%20rooftops%20peaceful%20garden%20with%20flowering%20trees%20soft%20morning%20mist%20creating%20serene%20atmosphere%20for%20meditation%20and%20prayer&width=1920&height=1080&seq=18&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Buddhist%20monastery%20on%20remote%20island%20surrounded%20by%20calm%20ocean%20waters%20traditional%20architecture%20peaceful%20isolation%20perfect%20for%20spiritual%20retreat%20and%20meditation%20practice%20away%20from%20worldly%20distractions&width=1920&height=1080&seq=19&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Sacred%20mountain%20peak%20with%20small%20Buddhist%20shrine%20ancient%20pilgrimage%20site%20prayer%20flags%20fluttering%20dramatic%20clouds%20peaceful%20valley%20below%20spiritual%20journey%20destination&width=1920&height=1080&seq=20&orientation=landscape',
  'https://readdy.ai/api/search-image?query=minimalist%20zen%20rock%20garden%20with%20raked%20sand%20patterns%2C%20traditional%20japanese%20stones%20arrangement%2C%20peaceful%20meditation%20space%2C%20soft%20natural%20lighting%2C%20clean%20lines%20and%20harmony&width=1920&height=1080&seq=zen-bg-6&orientation=landscape'
];


export default function BackgroundManager({ setCurrentBackground, triggerRef }: BackgroundManagerProps) {
  const [isChanging, setIsChanging] = useState(false);

  const changeRandomBackground = () => {
    if (isChanging) return;
    setIsChanging(true);
    
    const randomBg = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    
    setCurrentBackground(randomBg);
    localStorage.setItem('daily-background', randomBg);
    
    setTimeout(() => {
      setIsChanging(false);
    }, 500);
  };

  useEffect(() => {
    if (triggerRef) {
      triggerRef.current = changeRandomBackground;
    }
  }, [triggerRef]);

  useEffect(() => {
    // 初始化逻辑：页面加载/刷新时立即执行换图
    changeRandomBackground();
    localStorage.setItem('bg-date', new Date().toDateString());
  }, []);

  return null;
}