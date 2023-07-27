import "cypress/react18";
describe("Package todos", () => {
  it("Standard scenario for create todo", () => {
    cy.visit("http://localhost:3000/");
    // 1. Tại giao diện người dùng click "Create"
    cy.get("#create_todo").click();
    // 2. Hệ thống hiển thị giao diện tạo todo
    cy.get("#FormCreate").should("exist");
    // 3. Người dùng nhập thông tin todo và click "Submit"
    cy.get('input[name="title"]').type("Todo 1");
    cy.get('input[name="description"]').type("Description of 1");
    cy.get('button[type="submit"]').click();
    // 4. Hệ thống hiển thị danh sách với phần tử mới được thêm vào cuối danh sách
    cy.get("#FormCreate").should("not.exist");
    cy.get("table").contains("td", "Todo 1").should("be.visible");
  });
  it("Exception scenario for create todo -> Required constraints", () => {
    cy.visit("http://localhost:3000/");
    // 1. Tại giao diện người dùng click "Create"
    cy.get("#create_todo").click();
    // 2. Hệ thống hiển thị giao diện tạo todo
    cy.get("#FormCreate").should("exist");
    // 3. Người dùng nhập thông tin todo và click "Submit"
    cy.get('input[name="title"]').type("Todo 1");
    cy.get('button[type="submit"]').click();
    // 4. Hệ thống hiển thị lỗi
    cy.get("#FormCreate")
      .contains("div", "String must contain at least 1 character(s)")
      .should("be.visible");
    // 5. Người dùng nhập lại thông tin và click "Submit"
    cy.get('input[name="description"]').type("Description of 1");
    cy.get('button[type="submit"]').click();
    // 6. Hệ thống hiển thị danh sách với phần tử mới được thêm vào cuối danh sách
    cy.get("#FormCreate").should("not.exist");
    cy.get("table").contains("td", "Todo 1").should("be.visible");
  });
});
