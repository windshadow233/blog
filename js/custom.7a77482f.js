function setInfo(t,e,o,a){if($(".welcome #local-ip").text(t),$(".welcome #city").text(e),$(".welcome #distance").text(o),!a){var n=new Date;n.setTime(n.getTime()+3e5);var c=JSON.stringify({ip:t,city:e,distance:o});$.cookie("locationInfo",c,{expires:n,path:"/"})}}function getDistance(t,e,o,a){const{sin:n,cos:c,asin:r,PI:i,hypot:s}=Math;let l=(t,e)=>(t*=i/180,{x:c(e*=i/180)*c(t),y:c(e)*n(t),z:n(e)}),d=l(t,e),p=l(o,a),h=2*r(s(d.x-p.x,d.y-p.y,d.z-p.z)/2)*6371;return Math.round(h)}function getIpInfo(){if(void 0!==$(".card-announcement").css("display")&&"none"!==$(".card-announcement").css("display")||!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))if($.cookie("locationInfo")){var t=JSON.parse($.cookie("locationInfo"));setInfo(t.ip,t.city,t.distance,!0)}else $.ajax({type:"get",url:"https://apis.map.qq.com/ws/location/v1/ip",data:{key:"SGYBZ-W6R6C-IHT2B-AH6JO-4DFLZ-IKF3H",output:"jsonp"},dataType:"jsonp",success:function(t){let{result:e={}}=t;if(e&&e.location){let t=getDistance(117.22901,31.82057,e.location.lng,e.location.lat);setInfo(e.ip,e.ad_info.province+e.ad_info.city+e.ad_info.district,t,!1)}}})}function download(t,e){var o=new XMLHttpRequest;o.open("GET",t,!0),o.responseType="blob",o.onload=function(t){var a=window.URL.createObjectURL(o.response),n=document.createElement("a");n.style.display="none",n.href=a,n.download=e,n.click(),window.URL.revokeObjectURL(a)},o.send()}function categoryBarRandomColor(){$("#categoryBar").length>0&&$("#categoryBar .category-list-item").each((function(){let t=Math.floor(151*Math.random())+50,e=Math.floor(151*Math.random())+50,o=Math.floor(151*Math.random())+50;$(this).css("background",`rgb(${t},${e},${o})`)}))}function loadAbstract(){if(!document.querySelector("#article-container"))return;let t;if(null!==(match=location.pathname.match(/^\/blog\/(\d+)\/?/))){t=match[1];try{document.querySelector(".st").remove()}catch(t){}var e=new XMLHttpRequest;e.open("GET",`/abstract/${t}?t=${(new Date).getTime()}`),e.send(),e.onreadystatechange=t=>{if(4==e.readyState){if(200==e.status)var o=e.responseText.replace(/<[^>]*>/g,"");else o="文章摘要遇到异常。";const t=document.querySelector("#ai-content"),a=o;!function e(o){if(o<a.length)t.innerHTML+=a[o],setTimeout(e.bind(this),50,++o);else{var n=document.createElement("style");n.className="st",n.innerText="#ai-content::after{content:''!important;}",document.body.appendChild(n)}}(0)}}}}function createCharts(){let t=echarts.init(document.getElementById("posts-chart"),"light");t.setOption(postsOption),t.on("click","series",(t=>{"series"===t.componentType&&pjax.loadUrl("/archives/"+t.name.replace("-","/"))})),tagsChart=echarts.init(document.getElementById("tags-chart"),"light"),tagsChart.setOption(tagsOption),tagsChart.on("click",(t=>{t.name&&pjax.loadUrl("/tags/"+t.name.toLowerCase())})),categoriesChart=echarts.init(document.getElementById("categories-chart"),"light"),categoriesChart.setOption(categoriesOption),categoriesChart.on("click","series",(t=>{t.data.path&&pjax.loadUrl("/"+t.data.path)}))}$(document).on("pjax:complete",(function(t){void 0!==window.a2a&&a2a.init_all(),getIpInfo(),renderGitHubCalendar(),loadAbstract(),categoryBarRandomColor(),(chart=document.getElementById("posts-chart"))&&createCharts()})),$(document).on("pjax:error",(function(t){Snackbar.show({text:"似乎出了点问题，不妨刷新网页试试？",pos:"top-right",showAction:!1})})),$(document).on("click","a[download]",(function(t){t.preventDefault();download($(this).attr("href"),$(this).attr("download"))})),$(document).on("click",".DocSearch-Hit a",(function(t){t.preventDefault();var e=$(this).attr("href");pjax.loadUrl(e)})),$(document).ready((function(){getIpInfo(),renderGitHubCalendar(),loadAbstract(),categoryBarRandomColor(),(chart=document.getElementById("posts-chart"))&&createCharts()}));