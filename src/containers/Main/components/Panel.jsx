import { memo } from "react";
import { Card, Typography, Button, Select, MenuItem } from '../../../components';
import COUNTRIES from '../../../commons/constants/countries';
import { CardPanelContentStyled, ItemStyled } from "./style";

function Panel({updateAt, onChange, data, country, getCovidData}) {
    const { recovered } = data;

    const renderCountries = (country, index) => (
        <MenuItem key={`country-${index}`} value={country.value}>
            <ItemStyled>
                <div>{country.label}</div>
                <img src={country.flag} alt={`País-${country.label}`} />
            </ItemStyled>
        </MenuItem>
    );

    const textCovid19 = `País: ${country} - recuperados: ${recovered}`;

    const navigatorHasShare = navigator.share;

    const shareInfo = () => {
        navigator.share({
            title: `Dados do Covid19 - ${country}`,
            text: textCovid19,
            url: 'https://tarcnux-dio-covid19.netlify.app/'
        })
    }

    const copyInfo = () => {
        navigator.clipboard.writeText(textCovid19);
    }

    const renderShareButton = (
        <div>
            <Button variant="contained" color="primary" onClick={shareInfo}>
                Compartilhar
            </Button>
        </div>
    );

    const renderCopyButton = (
        <div>
            <Button variant="contained" color="primary" onClick={copyInfo}>
                Copiar
            </Button>
        </div>
    );

    return (
        <Card>
            <CardPanelContentStyled>
                <div>
                    <Typography variant="h5" component="span" color="primary">
                        COVID19 &nbsp;
                    </Typography>

                    <Typography variant="h6" component="span" color="primary">
                        Painel Coronavírus - &nbsp;
                    </Typography>

                    <Typography variant="body2" component="span" color="primary">
                        Atualizado em: {updateAt}
                    </Typography>
                    <div className="pt-2">
                        <Select onChange={onChange} value={country}>
                            {COUNTRIES.map(renderCountries)}
                        </Select>
                    </div>
                </div>
                { navigatorHasShare ? renderShareButton : renderCopyButton}
            </CardPanelContentStyled>
        </Card>
    )
}

export default memo(Panel);
