// Objeto para pegar os preços e as fotos das camisetas

var camisetas = {
    'branca': {

        'gola_v': {
            'sem_estampa': {
                'preco_unit': 5.12,
                'foto': 'v-white.jpg'
            },
            'com_estampa': {
                'preco_unit': 8.95,
                'foto': 'v-white-personalized.jpg'
            }
        },

        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 4.99,
                'foto': 'normal-white.jpg'
            },
            'com_estampa': {
                'preco_unit': 8.77,
                'foto': 'normal-white-personalized.jpg'
            }
        }
    },

    'colorida': {
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 6.04,
                'foto': 'v-color.jpg'
            },
            'com_estampa': {
                'preco_unit': 9.47,
                'foto': 'v-color-personalized.png'
            }
        },

        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 5.35,
                'foto': 'normal-color.jpg'
            },
            'com_estampa': {
                'preco_unit': 9.28,
                'foto': 'normal-color-personalized.jpg'
            }
        }
    }
}


// parâmetros da pesquisa

var parametros_pesquisa = {
    "quantidade": 10,
    "cor": "colorida",
    "gola": "Gola V",
    "qualidade": "q150",
    "estampa": "com_estampa",
    "embalagem": "bulk"
}


// Regras adicionais para o orçamento:

// 1. Verificar se há em localStorage os parâmetros do último orçamento e se houver, carregar a página com eles.

var paramSearchExist = JSON.parse(localStorage.getItem(parametros_pesquisa));

console.log(paramSearchExist + "tem algo aqui");

if (paramSearchExist) {
    $("#quantidade").val()
}

// 2. A camisa de qualidade alta (190g/m2) deve acrescer o preço unitário em 12%.

// 3. A embalagem unitária tem um custo de 0.15 por unidade

// 4. Após cálculo do preço, há que se aplicar um desconto por quantidade, sendo: 
// faixa 1: acima de 1.000 - Desconto de 15%
// faixa 2: acima de 500 - Desconto de 10%
// faixa 3: acima de 100 - Desconto de 5%



// Resolução do desafio:

$(function() {

    $('#gola').click(function() {
        var gola = $('#gola').find('.selected')
        console.log(gola);
        GolaVOrGolaNormal(gola);
    });

    // Se quiser uma sugestão dos passos a seguir para a resolução, veja mais abaixo.

    $('#quantidade').change(function() {
        parametros_pesquisa.quantidade = $('#quantidade').val();

        $('#result_quantidade').html(parametros_pesquisa.quantidade);
    });




    $('#branca').click(function(e) {
        $('#colorida').removeClass('selected');
        $(this).addClass('selected')
        var gola = $(e.target).val();
        console.log(gola);
        parametros_pesquisa.cor = 'branca';
        if (parametros_pesquisa.gola == 'Gola V') {
            $('#foto-produto').attr('src', '../img/v-white.jpg');
        } else {
            $('#foto-produto').attr('src', '../img/normal-white.jpg');
        }
    });

    $('#colorida').click(function() {
        $('#branca').removeClass('selected');
        $(this).addClass('selected')
        parametros_pesquisa.cor = 'colorida';

        if (parametros_pesquisa.gola == 'Gola V') {
            $('#foto-produto').attr('src', '../img/v-color.jpg');
        } else {
            $('#foto-produto').attr('src', '../img/normal-color.jpg');
        }
    });

    $('#gola_v').click(function() {
        $("#gola_normal").removeClass('selected');
        $(this).addClass('selected');
        parametros_pesquisa.gola = 'Gola V';
        GolaVOrGolaNormal(gola)
    });

    $('#gola_normal').click(function() {
        $("#gola_v").removeClass('selected');
        $(this).addClass('selected');
        parametros_pesquisa.gola = 'Gola Normal';
        GolaVOrGolaNormal(gola)
    });

    $('#q150').click(function() {
        $("#q190").removeClass('selected');
        $(this).addClass('selected');
        parametros_pesquisa.qualidade = 'q150';
    });

    $('#q190').click(function() {
        $("#q150").removeClass('selected');
        $(this).addClass('selected');
        parametros_pesquisa.qualidade = 'q190';
    });
    $("#embalagem").click(function() {
        $("#embalagem").change(function() {
            var embalagem = $(this).val();
            parametros_pesquisa.embalagem = embalagem
        })
    })

    $("#estampa").change(ComEstampaOuSem);

});

function GolaVOrGolaNormal(gola) {
    if (parametros_pesquisa.cor == 'branca') {
        if (gola.html() == 'Gola V') {
            $("#foto-produto").attr('src', '../img/v-white.jpg');

        } else {
            $('#foto-produto').attr('src', '../img/normal-white.jpg');
        }
    }
    if (parametros_pesquisa.cor == 'colorida') {
        if (gola.html() == 'Gola V') {
            $("#foto-produto").attr('src', '../img/v-color.jpg');
        } else {
            $('#foto-produto').attr('src', '../img/normal-color.jpg');
        }
    }
    ComEstampaOuSem();
}

function IsSelected(event) {
    $(event).removeClass('selected');
    $(event).addClass('selected')

}

function ComEstampaOuSem() {
    if ($('#estampa').val() == "sem_estampa") {
        parametros_pesquisa.estampa = "sem_estampa";
    } else {
        parametros_pesquisa.estampa = "com_estampa";
    }
    if (parametros_pesquisa.cor == 'branca') {
        if (parametros_pesquisa.gola == 'Gola Normal') {
            $('#foto-produto').attr('src', '../img/' + camisetas.branca.gola_normal.sem_estampa.foto);
            if (parametros_pesquisa.estampa == "com_estampa")
                $("#foto-produto").attr('src', '../img/' + camisetas.branca.gola_normal.com_estampa.foto);
        } else if (parametros_pesquisa.gola == "Gola V") {
            $("#foto-produto").attr('src', '../img/' + camisetas.branca.gola_v.sem_estampa.foto);
            if (parametros_pesquisa.estampa == "com_estampa")
                $("#foto-produto").attr('src', '../img/' + camisetas.branca.gola_v.com_estampa.foto);
        }
    } else if (parametros_pesquisa.cor == 'colorida') {
        if (parametros_pesquisa.gola == 'Gola Normal') {
            $('#foto-produto').attr('src', '../img/' + camisetas.colorida.gola_normal.sem_estampa.foto);
            if (parametros_pesquisa.estampa == "com_estampa")
                $("#foto-produto").attr('src', '../img/' + camisetas.colorida.gola_normal.com_estampa.foto);
        } else if (parametros_pesquisa.gola == "Gola V") {
            $("#foto-produto").attr('src', '../img/' + camisetas.colorida.gola_v.sem_estampa.foto);
            if (parametros_pesquisa.estampa == "com_estampa")
                $("#foto-produto").attr('src', '../img/' + camisetas.colorida.gola_v.com_estampa.foto);
        }
    }
}

function CalcPrice() {

}












// Sugestão de etapas da resolução

// 1. Crie uma função para calcular o preço baseado nos parâmetros da variável "parametros_pesquisa" e solte o 
// valor no console para testar se está certo.

// 2. Faça os eventos click e change para os filtros.

// a. Faça o evento click para os filtros do tipo botão (.option-filter). Sempre que houver um click, 
// remova a classe "selected" dos botões do grupo e depois aplique-a apenas ao que foi clicado para
// que ele fique azul.

// b. Faça o evento change para os filtros do tipo <select> e para o <input> de quantidade.

// c. Sempre que um dos eventos acima ocorrer, atualize a variável "parametros_pesquisa" e rode a função para 
// calcular o preço


// 3. Altere a função do cálculo do preço. Em vez de soltar os valores no console, atualize as informações
// nos elementos "result_", atualize o preço no elemento "valor-total" e mude o atributo "src" do elemento 
// "foto-produto" para alterar a imagem mostrada (todas as imagens estão na pasta img).

// 4. Adicione a funcionalidade de hide e show do spinner (elemento "refresh-loader") à função de cálculo de preço. 
// Como não estamos consultando dados externos, o cálculo acaba sendo rápido demais, portanto use um setTimeout 
// para deixar ele aparecer por pelo menos 2 segundos.

// 5. Crie a funcionalidade do localStorage e ao carregar a página, consulte o localStorage, 
// atualize a variável "parametros_pesquisa" e rode a função de cálculo de preço