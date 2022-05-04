import React, { useEffect, useState } from 'react'
import { IFrame } from './iframe'
import useDebounced from '../hooks/useDebounced'

const Template = props => {
    const propsData = props.data;
    
    const [description, setDescription] = useState('');

    const ipc = window.api;
    const data = {
        headerText: propsData?.themeName.toLowerCase(),
        themeNameWithoutM5: propsData?.themeName.replace('M5', ''),
        themeNameUpperFirstAndEndWithM5: propsData?.themeName.replace(/^./, str => str.toUpperCase()).replace(/m5$/, 'M5'),
        subtitle: propsData?.subtitle && propsData?.subtitle[0].toUpperCase() + propsData?.subtitle.toLowerCase().slice(1),
        description
    };

    ipc.receive('fromMain', (data) => {
        if (!data) return;
        const parser = new DOMParser();
        const root = parser.parseFromString(data, "text/html");
        if (!root) return;
        
        const sections = root.querySelectorAll('section');
        let description = sections[1].textContent;
        description = description.replace(/LIVE DEMO BUY NOW|Live Demo Buy Now/g, '').trim()
        description = description.match(/.*Theme.  (.*)/s)[1].trim();

        let demos = sections[3].textContent;
        demos = demos.replace(/\s\s+(Live Demo\n|LIVE DEMO|Live Demo>|Live Demo >\n)\s\s+/g, ',').split(',');
        demos.shift();
        demos.pop();

        let demoLinks = demos.map((str) => str.toLowerCase().replace(/ /ig, '_'));
        let demoNames = demos.map((str) => {
            const lower = str.toLowerCase();
            return lower[0].toUpperCase() + lower.slice(1)
        });

        let videoLinks = sections[4].querySelectorAll('iframe');

        const videoLink = [...videoLinks].find((el) => {
            return /www.youtube.com/i.test(el.getAttribute('data-src'))
        })
        const YTLink = videoLink.getAttribute('data-src')

        const headerIMG = '../../output/headerOutput.jpg';
        const landingIMG = '../../output/landingOutput.jpg';
        const YTIMG = '../../output/YToutput.jpg';

        setDescription(description);
        // resolve ({ themeName: jsonData.themeName, imageHeaderSubtitle: jsonData.imageHeaderSubtitle.split(' ')[0], description, demoNames, demoLinks, headerIMG, landingIMG, YTIMG, YTLink });
    })

    const debounced = useDebounced(() => {
        ipc.send('toMain', { type: 'getData', data:  data.headerText});
    }, 500);

    useEffect(() => {
        debounced();
    }, [data.headerText]);

    return (
        <IFrame width="100%" height="100%" settingsData={data}>
            <table width="100%" border="0" cellPadding="0" cellSpacing="0" align="center" className="full">
                <tbody>
                    <tr>
                        <td width="100%" valign="top" align="center">
                            <table width="100%" border="0" cellPadding="0" cellSpacing="0" align="center" className="mobile" style={{maxWidth: '600px'}}>
                                <tbody>
                                    <tr>
                                        <td align="center">
                                            <table width="100%" border="0" cellPadding="0" cellSpacing="0" align="center" className="full">
                                                <tbody>
                                                    <tr>
                                                        <td width="100%" align="center" className="img600">
                                                        <table width="100%" border="0" cellPadding="0" cellSpacing="0" align="center" style={{borderCollapse: 'collapse', msoTableLspace: '0pt', msoTableRspace: '0pt'}} className="fullCenter">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="100%" align="center">
                                                                        <table width="100%" border="0" cellPadding="0" cellSpacing="0" align="center" bgcolor="#ffffff" style={{borderRadius: '5px', border: '0px solid #fafafa', backgroundColor: '#ffffff'}} className="fullCenter">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="100%" align="center" className="fullCenter hover img600">
                                                                                        <a href="https://mobirise.com/extensions/{{ themeName }}/?utm_source=mb_{{ themeNameWithoutM5 }}_email&utm_medium=email&utm_campaign=mb_{{ themeNameWithoutM5 }}_promo" style={{textDecoration: 'none'}}>
                                                                                            {/* src={ headerIMG } */}
                                                                                            <img  style={{width: '100%', maxWidth: '600px'}} alt="" border="0" className="img600" />
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="100%" height="40" style={{fontSize: '1px', lineHeight: '1px'}}>&nbsp;</td>
                                                                                </tr>
                                                                                <tr></tr>
                                                                                <tr>
                                                                                    <td width="100%" align="center">
                                                                                        <table style={{width: '100%', maxWidth: '520px'}} className="mobile" border="0" cellPadding="0" cellSpacing="0" align="center">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td width="100%" style={{color: '#000000', fontFamily: '"Jost", roboto, Arial, Helvetica, sans-serif', fontWeight: '400', verticalAlign: 'top', fontSize: '24px', textAlign: 'center', lineHeight: '30px'}} className="fullCenter">
                                                                                                        {/* <b>{{ themeNameUpper }} – {{ imageHeaderSubtitle }} Website Theme</b> */}
                                                                                                        <b> { data.themeNameUpperFirstAndEndWithM5 } – { data.subtitle } Website Theme</b>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td width="100%" height="40" style={{fontSize: '1px', lineHeight: '1px'}}>&nbsp;</td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td width="100%" style={{color: '#000000', fontFamily: '"Jost", roboto, Arial, Helvetica, sans-serif', fontWeight: '400', verticalAlign: 'top', fontSize: '18px', textAlign: 'left', lineHeight: '30px'}} className="fullCenter">
                                                                                                        
                                                                                                            { description }
                                                                                                            <br></br>
                                                                                                            <br></br>View live demo website: 
                                                                                                            {/* {{#each demoLinks}}
                                                                                                            <a href="https://mobirise.com/extensions/{{ ../themeName }}/{{this}}/?utm_source=mb_{{  ../themeNameWithoutM5 }}_email&utm_medium=email&utm_campaign=mb_{{ ../themeNameWithoutM5 }}_promo" target="_blank" style="color: #4ea2e3;font-weight: bold;"><strong>{{ lookup ../demoNames @index }}</strong></a>{{#if @last}}.{{else}}, {{/if}}
                                                                                                            {{/each}} */}
                                                                                                       
                                                                                                        <br></br>
                                                                                                        <br></br>
                                                                                                        View live demo website: 
                                                                                                        <a href="hrr" target="_blank" style={{color: '#4ea2e3', fontWeight: 'bold'}}>
                                                                                                            <strong>text</strong>
                                                                                                        </a>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="100%" height="30" style={{fontSize: '1px', lineHeight: '1px'}}>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td valign="middle" align="center">
                                                                                        <table border="0" cellPadding="0" cellSpacing="0" align="center" className="fullCenter">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center">
                                                                                                        <table border="0" cellPadding="0" cellSpacing="0" align="center" className="buttonScale">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td align="center" height="42" bgcolor="#6592e6" style={{borderRadius: '4px'}}>
                                                                                                                        {/* <a href="https://mobirise.com/extensions/{{ themeName }}/?utm_source=mb_{{ themeNameWithoutM5 }}_email&utm_medium=email&utm_campaign=mb_{{ themeNameWithoutM5 }}_promo" style="color: #ffffff; text-decoration: none;  padding-left: 35px; padding-right: 35px; font-weight: 600;  font-family: 'Jost', roboto, Arial, Helvetica, sans-serif; color: #ffffff; font-size: 18px; text-transform: uppercase; line-height: 20px;">View live demo</a> */}
                                                                                                                        <a href="hr" style={{color: '#ffffff', textDecoration: 'none', paddingLeft: '35px', paddingRight: '35px', fontWeight: '600',  fontFamily: '"Jost", roboto, Arial, Helvetica, sans-serif', fontSize: '18px', textTransform: 'uppercase', lineHeight: '20px'}}>View live demo</a>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="100%" height="50" style={{fontSize: '1px', lineHeight: '1px'}}>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="100%" align="center">
                                                                                        <table style={{width: '100%', maxWidth: '520px'}} className="mobile" border="0" cellPadding="0" cellSpacing="0" align="center">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td width="100%" style={{color: '#000000', fontFamily: '"Jost", roboto, Arial, Helvetica, sans-serif', fontWeight: '400', verticalAlign: 'top', fontSize: '24px', textAlign: 'center', lineHeight: '30px'}} className="fullCenter">
                                                                                                        <b>Download the Latest Mobirise Version</b>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td width="100%" height="12" style={{fontSize: '1px', lineHeight: '1px'}}>&nbsp;</td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td width="100%" style={{color: '#000000', fontFamily: '"Jost", roboto, Arial, Helvetica, sans-serif', fontWeight: '400', verticalAlign: 'top', fontSize: '18px', textAlign: 'center', lineHeight: '30px'}} className="fullCenter">
                                                                                                        {/* The {{ themeNameUpper }} theme is available in Mobirise v5.4 and higher. Please update the Mobirise to access {{ themeNameUpper }}. */}
                                                                                                        The  theme is available in Mobirise v5.4 and higher. Please update the Mobirise to access.
                                                                                                        <br></br>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="100%" height="30" style={{fontSize: '1px', lineHeight: '1px'}}>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td valign="middle" align="center">
                                                                                        <table border="0" cellPadding="0" cellSpacing="0" align="center" className="fullCenter">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center">
                                                                                                        <table border="0" cellPadding="0" cellSpacing="0" align="center" className="buttonScale">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td align="center" height="42" bgcolor="#6592e6" style={{borderRadius: '4px'}}>
                                                                                                                        {/* <a href="https://mobirise.com/history.html?utm_source=mb_{{ themeNameWithoutM5 }}_email&utm_medium=email&utm_campaign=mb_{{ themeNameWithoutM5 }}_promo" style="color: #ffffff; text-decoration: none;  padding-left: 35px; padding-right: 35px; font-weight: 600;  font-family: 'Jost', roboto, Arial, Helvetica, sans-serif; color: #ffffff; font-size: 18px; text-transform: uppercase; line-height: 20px;">DOWNLOAD NOW</a> */}
                                                                                                                        <a href="hrr" style={{color: '#ffffff', textDecoration: 'none',  paddingLeft: '35px', paddingRight: '35px', fontWeight: '600',  fontFamily: '"Jost", roboto, Arial, Helvetica, sans-serif', fontSize: '18px', textTransform: 'uppercase', lineHeight: '20px'}}>DOWNLOAD NOW</a>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="100%" height="50" style={{fontSize: '1px', lineHeight: '1px'}}>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="100%" align="center">
                                                                                    <table style={{width: '100%', maxWidth: '520px'}} className="mobile" border="0" cellPadding="0" cellSpacing="0" align="center">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td width="100%" style={{color: '#000000', fontFamily: '"Jost", roboto, Arial, Helvetica, sans-serif', fontWeight: '400', verticalAlign: 'top', fontSize: '24px', textAlign: 'center', lineHeight: '30px'}} className="fullCenter">
                                                                                                    <b>Recent Websites Made with Mobirise</b>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td width="100%" height="12" style={{fontSize: '1px', lineHeight: '1px'}}>&nbsp;</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td width="100%" style={{color: '#000000', fontFamily: '"Jost", roboto, Arial, Helvetica, sans-serif', fontWeight: '400', verticalAlign: 'top', fontSize: '18px', textAlign: 'left', lineHeight: '30px'}} className="fullCenter">
                                                                                                    * <a rel="noreferrer" href="https://music.upd.edu.ph/?utm_source=mobirise_showcase&utm_medium=mobirise&utm_campaign=mobirise_showcase" target="_blank" style={{color: '#4ea2e3'}}>University of the Philippines College Of Music</a> <br></br>
                                                                                                    * <a rel="noreferrer" href="https://www.mcldeptms.org/Library.html?utm_source=mobirise_showcase&utm_medium=mobirise&utm_campaign=mobirise_showcase" target="_blank" style={{color: '#4ea2e3'}}>Marine Corps League Dept of Mississippi
                                                                                                    </a> <br></br>
                                                                                                    * <a rel="noreferrer" href="http://www.grandinote.it/?utm_source=mobirise_showcase&utm_medium=mobirise&utm_campaign=mobirise_showcase" target="_blank" style={{color: '#4ea2e3'}}>Grandinote</a> <br></br>

                                                                                                    * <a rel="noreferrer" href="https://www.thelongstay.com/page1.html?utm_source=mobirise_showcase&utm_medium=mobirise&utm_campaign=mobirise_showcase" target="_blank" style={{color: '#4ea2e3'}}>The Long Stay</a> <br></br>
                                                                                                    * <a rel="noreferrer" href="https://awakenstudios.sg/prints.html?utm_source=mobirise_showcase&utm_medium=mobirise&utm_campaign=mobirise_showcase" target="_blank" style={{color: '#4ea2e3'}}>Awaken Studios</a> <br></br>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="100%" height="50" style={{fontSize: '1px', lineHeight: '1px'}}>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="100%" align="center" className="fullCenter hover img600">
                                                                                        <a href="https://mobirise.com/extensions/{{ themeName }}/?utm_source=mb_{{ themeNameWithoutM5 }}_email&utm_medium=email&utm_campaign=mb_{{ themeNameWithoutM5 }}_promo" style={{textDecoration: 'none'}}>
                                                                                            <img src="{{ landingIMG }}" style={{width: '100%', maxWidth: '600px'}} alt="" border="0" className="img600" />
                                                                                        </a>
                                                                                    </td>
                                                                                </tr> 
                                                                                <tr>
                                                                                    <td width="100%" height="30" style={{fontSize: '1px', lineHeight: '1px'}}>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="100%" height="30" style={{fontSize: '1px', lineHeight: '1px'}}>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="100%" height="1" align="center" className="buttonScale">
                                                                                    <table width="120" align="center" border="0" cellPadding="0" cellSpacing="0" className="buttonScale">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td height="1" width="300" bgcolor="#6592e6" style={{fontSize: '1px', lineHeight: '2px'}}>&nbsp;</td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="100%" height="30" style={{fontSize: '1px', lineHeight: '1px'}}>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="100%" align="center">
                                                                                    <table style={{width: '100%', maxWidth: '520px'}} className="mobile" border="0" cellPadding="0" cellSpacing="0" align="center">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td width="100%" style={{color: '#000000', fontFamily: '"Jost", roboto, Arial, Helvetica, sans-serif', fontWeight: '400', verticalAlign: 'top', fontSize: '24px', textAlign: 'center', lineHeight: '30px'}} className="fullCenter">
                                                                                                    <b>Complete Website Builder Kit Promo - Save 97%!</b>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td width="100%" height="12" style={{fontSize: '1px', lineHeight: '1px'}}>&nbsp;</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td width="100%" style={{color: '#000000', fontFamily: '"Jost", roboto, Arial, Helvetica, sans-serif', fontWeight: '400', verticalAlign: 'top', fontSize: '18px', textAlign: 'left', lineHeight: '30px'}} className="fullCenter">
                                                                                                    {/* <a href="https://mobirise.com/extensions/kit/?utm_source=mb_{{ themeNameWithoutM5 }}_email&utm_medium=email&utm_campaign=mb_{{ themeNameWithoutM5 }}_promo" target="_blank" style="color: #6592e6; text-decoration: none; font-weight: 600;  font-family: 'Jost', Arial, Helvetica, sans-serif;"> */}
                                                                                                    The theme is already included in Complete Website Builder Kit. Get all premium website themes with the <a href="hrr" target="_blank" style={{color: '#6592e6', textDecoration: 'none', fontWeight: '600',  fontFamily: '"Jost", Arial, Helvetica, sans-serif'}}>insane discount</a> and access <b>future</b> themes for one year as they’re released.
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="100%" height="30" style={{fontSize: '1px', lineHeight: '1px'}}>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="100%" align="center" className="fullCenter hover img600">
                                                                                        <a href="htt" style={{textDecoration: 'none'}}>
                                                                                            <img src="https://mcusercontent.com/f0e9e8cec7eeb33b5260ba085/images/ac996135-1dda-4570-9e71-877bd9635557.jpg" style={{width: '100%', maxWidth: '600px'}} alt="" border="0" className="img600" />
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="100%" height="30" style={{fontSize: '1px', lineHeight: '1px'}}>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="100%" align="center" className="fullCenter hover img600">
                                                                                        <a href="{{ YTIMG.link }}" style={{textDecoration: 'none'}}>
                                                                                            <img src="{{ YTIMG.image }}" style={{width: '100%', maxWidth: '600px'}} alt="" border="0" className="img600" />
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table border="0" cellPadding="20" cellSpacing="0" width="100%" className="full">
                                                <tbody>
                                                    <tr>
                                                        <td align="center" valign="top" style={{paddingRight: '40px', paddingLeft: '40px', paddingTop: '40px', paddingBottom: '60px', borderCollapse: 'collapse'}}>
                                                            <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td valign="top" className="footerContent" style={{borderTop: '0px solid #BBBBBB', paddingTop: '20px', borderCollapse: 'collapse', color: '#777777', fontFamily: 'Arial', fontSize: '12px', lineHeight: '150%', textAlign: 'center'}}>You have received this e-mail because you are subscribed as a registered user of our product *|MERGE4|*, since *|MERGE3|*.
                                                                            <br></br><a href="https://mobirise.com/" style={{color: '#777777', fontFamily: 'Arial', fontSize: '12px', lineHeight: '150%', textAlign: 'center', textDecoration: 'none'}}>Mobirise.com</a> | <a href="https://mobirise.com/extensions/kit/" style={{color: '#777777', fontFamily: 'Arial', fontSize: '12px', lineHeight: '150%', textAlign: 'center', textDecoration: 'none'}}>Mobirise Kit</a> | <a href="*|UNSUB|*" style={{color: '#777777', fontFamily: 'Arial', fontSize: '12px', lineHeight: '150%', textAlign: 'center', textDecoration: 'none'}}>Unsubscribe</a>
                                                                            <br></br>Flight Forum 40 · 5657 DB Eindhoven · Netherlands
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </IFrame>
    );
};

export default Template;