import unittest
from app.database.repositories import ReceitaRepository

class TestReceitaRepository(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.repository = ReceitaRepository()

    @classmethod
    def tearDownClass(cls):
        cls.repository.close()

    def test_add_receita(self):
        self.repository.add_receita(
            id=1,
            txt_breve_material='Arroz',
            material='Arroz Branco',
            preco_plano=2.50,
            classe='Grão',
            categoria_incidencia1='Tipo A',
            cat1='Cat A',
            incidencia_mes1=5,
            categoria_incidencia2='Tipo B',
            cat2='Cat B',
            incidencia_mes2=3,
            gluten=True,
            lactose=False,
            qtd_g=100,
            kcal=130,
            cho=28,
            ptn=2.5,
            ptn_liq=2.0,
            gord_total=0.5,
            gord_sat=0.1,
            fibra=1.0,
            sodio=0.0,
            info_adicional='Sem aditivos'
        )

        receita = self.repository.get_receita_by_material('Arroz Branco')
        self.assertIsNotNone(receita, "A receita não foi adicionada corretamente.")
        self.assertEqual(receita[1], 'Arroz')

    def test_update_receita(self):
        self.repository.update_receita(1, txt_breve_material='Arroz Cozido', preco_plano=3.00)

        receita = self.repository.get_receita_by_material('Arroz Branco')
        self.assertIsNotNone(receita, "A receita não foi encontrada para atualização.")
        self.assertEqual(receita[1], 'Arroz Cozido')
        self.assertEqual(receita[3], 3.00)

    def test_delete_receita(self):
        self.repository.delete_receita(1)

        receita = self.repository.get_receita_by_material('Arroz Branco')
        self.assertIsNone(receita, "A receita ainda está presente no banco de dados.")

    def test_get_all_receitas(self):
        all_receitas = self.repository.get_all_receitas()
        self.assertIsInstance(all_receitas, list, "O retorno deve ser uma lista.")

if __name__ == '__main__':
    unittest.main()