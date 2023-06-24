import Image from 'next/image'

const centerDiv = {
    'display':'flex',
    'justify-content':'center',
    'flex-direction':'column',
    'align-items':'center',
}

const textWidth = 600;
const pStyle = {'font-size':'large','width':textWidth}

function PLetter(params) {
   return <p style={pStyle}> {params.children}</p>
}

function Home(params) {
   return (
    <div style={centerDiv}> 
        <h1> Cartinha dos dias das mães 2020 </h1>
            <Image src="/assets/drawing.svg" width={textWidth} height="300" alt="duas crianças e uma mãe" />
            <PLetter> Querida Mamãe... </PLetter>
            <PLetter>
                Não lembro quando foi que te vi pela primeira vez, sinto que sempre te
                conheci e vivo como se sua vida não tivesse fim, pelo menos era assim até
                essa quarentena. Admito o fato da senhora ser calorenta e fugir dos meus
                braços é algo que nunca me agradou, agora estando longe é um bom momento
                para repensar sobre suas atitudes. Posso não demostrar muito, mas o meu
                desejo é de tranca-la numa jaula e só librar quando essa crise passar. A
                verdade é que sempre adorei reclamar dos seus defeitos que não são poucos
                e nem desprezı́veis, mas não vou me alongar a dize-los, uma vez que essa
                carta não visa lembra-la do seus vı́cio em tabaco, trabalho, pouca paciência,
                dentre outros. A verdade que sempre adorei reclamar dos seus defeitos mas
                foi a pouco tempo que me dei conta de que como filho também não foi
                perfeito, mesmo que possam ser consideradas poucas as falhas, venho dizer
                que estou trabalhando nas correções, vai dar certo. Sei que essa carta se
                trata sobre os dias das mães e os pontos positivos de você ser a minha mãe,
                no entanto gostaria de aproveitar para dizer o quanto eu te amo e relembrar
                três momentos que não merecem ser esquecidos:
        </PLetter>
        <h2> Para dançar isso aqui é BOMBA! </h2>
        <PLetter>
            lembra da senhora dançando
            e peidando ao mesmo tempo na nossa frente? aquilo sim era um
            movimento sexy. Quando pequeno sempre fui bastante caladão, e suas
            graças além de me fazer feliz, faz parte de quem sou hoje. Penso que
            quando eu me esforçava pra ser engraçado você achava que eu só estava
            tentando imitar o meu irmão, mas a fonte de inspiração minha e dele
            era você.
       </PLetter>
       <h2> Arroz, brócolis e ovo, muito ovo </h2>
       <PLetter>
            Vó pode ter trazido a salada, mas
            no inicio era você que fazia o almoço, nunca entendi por que gostava
            tanto daquela comida, ou da vitamina de banana ou de ser tão mimado
            ao receber uma mamadeira e ir direto pra sala assistir tv logo após você
            me buscar da creche.
       </PLetter>
       <h2> Abraçadinho com você </h2>
       <PLetter>
            Em uma época não tão distante, quando
            meus braços não conseguiam se encontrar ao abraçar você. Eu, Samuel
            Cavalcanti, nascido no interior da Bahia, tinha poucos momentos de
            felicidade ao ficar Abraçadinho com você em quando assistı́amos as
            novelas da globo, ou seus filmes de comédia romântica, o calor não era tão grande assim não é
            mesmo ? é mesmo.
       </PLetter>

       <PLetter>
            Por fim, mas não menos importante, falta dizer o quanto eu te amo e a
            resposta é muito.
            Muito eu te amo, eu te amo muito,
            do seu querido e amado filho, Samuel.
       </PLetter>
    </div>
   ); 
}


export default Home;
