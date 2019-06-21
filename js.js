$(document).ready(function(){

	var native_width = 0;
	var native_height = 0;
  $(".large").css("background","url('" + $(".small").attr("src") + "') no-repeat");

	//FUNCION OVER DEL MOUSE SOBRE LA IMAGEN
	$(".magnify").mousemove(function(e){
        /*
        CUANDO EL USUARIO HACE OVER SOBRE LA IMAGEN, PRIMERO SE CALCULARA
        LAS DIMENSIONES NATIVAS SI EXISTEN O NO. UNA VEZ OBTENIDAS EL SCRIPT MOSTRARA
        LA VERSION MAS GRANDE DE LA IMAGEN EN LA LUPA
        */
		
		if(!native_width && !native_height)
		{
            /*
            AQUI SE CREARA UN OBJETO DE IMAGEN CON LA MISMA IMAGEN A LA QUE APUNTAMOS EN LA 
            CLASE .SMALL. */
			
			var image_object = new Image();
			image_object.src = $(".small").attr("src");
			
		
			native_width = image_object.width;
			native_height = image_object.height;
		}
		else
		{
            /*
            OBTENEMOS LAS COORDENADAS X E Y DEL MOUSE. ESTO ES LA POSICION DE 
            .MAGNIFY CON RESPECTO A EL DOCUMENT */
			
			var magnify_offset = $(this).offset();
			
			var mx = e.pageX - magnify_offset.left;
			var my = e.pageY - magnify_offset.top;
            
            /*
            ACA HACEMOS APARECER CON FADE OUT LA LUPA EN CASO DE QUE SALGA DEL CONTENEDOR */
			
			if(mx < $(this).width() && my < $(this).height() && mx > 0 && my > 0)
			{
				$(".large").fadeIn(200);
			}
			else
			{
				$(".large").fadeOut(200);
			}
			if($(".large").is(":visible"))
			{
                /*ACA CALCULAMOS QUE SE MUESTRE EN LA LUPA LO MISMO QUE APUNTA EL MOUSE. PARA ESTO
                OBTENEMOS EL RADIO DE EL PIXEL AL QUE APUNTA EL MOUSE CON RESPECTO A LA IMAGEN
                Y USAMOS ESA POSICION PARA UBICAR LA IMAGEN GRANDE DENTRO DE LA LUPA */
				
				var rx = Math.round(mx/$(".small").width()*native_width - $(".large").width()/2)*-1;
				var ry = Math.round(my/$(".small").height()*native_height - $(".large").height()/2)*-1;
				var bgp = rx + "px " + ry + "px";
                
                /*EFECTUAMOS EL MOVIMIENTO DE LA LUPA CON EL MOUSE */
				
				var px = mx - $(".large").width()/2;
				var py = my - $(".large").height()/2;
				
				
				
				$(".large").css({left: px, top: py, backgroundPosition: bgp});
			}
		}
	})
})