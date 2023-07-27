import { FormMutation } from './FormMutation'
 
describe('<FormMutation />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FormMutation uid='FormCreate' variant='Create' />)
  })
})