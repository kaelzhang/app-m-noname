module.exports= '<div class="promo-feature">'+
'<img class="img" src="<%= %>" height="auto" width="100%"></img>'+
'<div class="title"><h1><%= title %></h1></div>'+
'</div>'+
'<ul class="promo-info Fix">'+
'<li><i class="icon-<%= refund ? \'y"></i>\' : \'n"></i>不\' %>支持随时退</li>'+
'<li><i class="icon-<%= refund ? \'y"></i>\' : \'n"></i>不\' %>支持过期退</li>'+
'<li><%= browses %>人浏览</li>'+
'<li><%= create_time %>发布时间</li>'+
'<li><%= expires %> 后过期</li>'+
'</ul>';;