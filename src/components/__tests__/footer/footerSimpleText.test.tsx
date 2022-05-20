import { render } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'

import FooterSimpleText from '../../footer/footerSimpleText'

describe("Test if the FooterSimpleText component is working as expected", () => {
    it("<FooterSimpleText /> matches snapshot", () => {
        const component = render(<FooterSimpleText campus = 'global' />);
        expect(component.container).toMatchSnapshot();
    });

    it("<FooterSimpleText /> renders without exploding", () => {
        const component = render(<FooterSimpleText campus = 'global' />);
        expect(component.getByTestId("footer-copyright"))
            .toBeInTheDocument();
    });
});