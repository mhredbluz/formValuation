<template>
  <Vueform endpoint="https://ccaa-2804-7f0-96c3-8024-9508-7264-6f51-9ce8.ngrok-free.app/api/submit" method="post" ref="formView"
    size="md"
    class="bg-white text-gray-800 border-gray-300 shadow-lg rounded-lg p-4"
    
  >
    <template #empty>
      <FormSteps>
        <FormStep class="text-primary hover:text-accent"
          name="page0"
          :elements="[
            'id',
            'principalAtividade',
            'container',
          ]"
          label="Atividades"
        />
        <FormStep class="text-primary hover:text-accent"
          name="page1"
          label="Desmonstrativos"
          :elements="[
            'tituloBalancoDRE_copy',
            'divider_7',
            'containerBalancoDRE',
            ...generateDynamicElementNames(),
          ]"
        />
        <FormStep class="text-primary hover:text-accent"
          name="page2"
          :elements="[
            'regimeRecolhimentoIR',
            'aliquotaIrCsll',
            'divider',
            'numeroFuncionarios',
            'btUploadContratoSocial',
          ]"
          label="Recolhimento do IR"
        />
        <FormStep class="text-primary hover:text-accent"
          name="page3"
          label="Documentos"
          :elements="[
            'divider_6',
            'existEmprestimo',
            'anexoEmprestimos',
            'divider_5',
            'existBeneficioFiscal',
            'anexoBeneficioFiscal',
            'divider_4',
            'existBudget',
            'anexoBudget',
            'divider_2',
            'existImposto',
            'anexoImpostos',
            'divider_3',
            'existCapex',
            'anexoCapexInvestimentos',
            'divider_1',
          ]"
        />
        <FormStep class="text-primary hover:text-accent"
          name="page4"
          :elements="[
            'tituloBalancoDRE',
            'existDRE',
            'container2_copy',
          ]"
          label="Balanço e DRE"
        />
        <FormStep class="text-primary hover:text-accent"
          name="page5"
          :elements="[
            'tituloContador',
            'nomeContador',
            'telefoneContador',
          ]"
          label="Dados do Contador"
        />
      </FormSteps>

      <FormElements>
        <TextElement
          name="id"
          input-type="number"
          autocomplete="on"
          label="ID"
          size="sm"
        />
        <TextElement
          name="principalAtividade"
          label="Principal Atividade da Empresa"
          description="Descreva detalhadamente a principal atividade da empresa"
          size="md"
        />
        <GroupElement
          name="container"
        >
          <SelectElement
            name="atividade1"
            :search="true"
            :native="false"
            label="Atividade 1"
            input-type="search"
            autocomplete="off"
            :items="opcoesPrimeiroNivel"
            v-model="selectedAtividade1"
            @change="atualizarOpcoesSegundoNivel"
          />
          <SelectElement
            v-if="selectedAtividade1"
            name="atividade2"
            :search="true"
            :native="false"
            label="Atividade 2"
            input-type="search"
            autocomplete="off"
            :items="opcoesSegundoNivel"
            v-model="selectedAtividade2"
            @change="atualizarOpcoesTerceiroNivel"
          />
          <SelectElement
            v-if="selectedAtividade2"
            name="atividade3"
            :search="true"
            :native="false"
            label="Atividade 3"
            input-type="search"
            autocomplete="off"
            :items="opcoesTerceiroNivel"
          />
        </GroupElement>
        <StaticElement
          name="tituloBalancoDRE_copy"
          tag="h3"
          content="Balanço patrimonial e Demonstrativo do Resultado do Exercício"
        />
        <StaticElement
          name="divider_7"
          tag="hr"
        />
        <GroupElement name="containerBalancoDRE">
          <GroupElement
            v-for="(year, index) in Array(5).fill().map((_, i) => new Date().getFullYear() - i)"
            :key="index"
            name="column1"
            :columns="{
              default: {
                container: 12,
              },
              lg: {
                container: 6,
              },
            }"
          >
            <MultifileElement 
              :name="'btUploadDemonstrativos' + year"
              :label="'Demonstrativo do Resultado do Exercício ' + year + ':'"
              description="Enviar DRE do ano correspondente"
              accept="pdf"
            />
          </GroupElement>
          <GroupElement
            v-for="(year, index) in Array(5).fill().map((_, i) => new Date().getFullYear() - i)"
            :key="index"
            name="column2"
            :columns="{
              container: 6,
            }"
          >
            <MultifileElement 
              :name="'btUploadBalanco' + year"
              :label="'Balanço Patrimonial ' + year + ':'"
              description="Enviar Balanço Patrimonial do ano correspondente"
              :urls="{}"
            />
          </GroupElement>
        </GroupElement>
        <SelectElement
          name="regimeRecolhimentoIR"
          :items="[
            {
              value: '0',
              label: 'Lucro Real',
            },
            {
              value: '1',
              label: 'Lucro Presumido',
            },
            {
              value: '2',
              label: 'Simples Nacional',
            },
          ]"
          :search="true"
          :native="false"
          label="Opção do Regime de Recolhimento do IR:"
          input-type="search"
          autocomplete="off"
          :columns="{
            lg: {
              container: 6,
            },
          }"
        />
        <TextElement
          name="aliquotaIrCsll"
          label="Alíquota Média de IR e CSLL:"
          input-type="number"
          :columns="{
            lg: {
              container: 6,
            },
          }"
        />
        <StaticElement
          name="divider"
          tag="hr"
        />
        <TextElement
          name="numeroFuncionarios"
          input-type="number"
          :rules="[
            'nullable',
            'numeric',
          ]"
          autocomplete="off"
          label="Número de Funcionários"
          :columns="{
            default: {
              container: 6,
            },
            lg: {
              container: 6,
            },
          }"
        />
        <FileElement 
          name="btUploadContratoSocial"
          label="Contrato Social"
          :urls="{}"
          description="Última Alteração do Contrato Social"
          :columns="{
            lg: {
              container: 6,
            },
            default: {
              container: 6,
            },
          }"
        />
        <StaticElement
          name="divider_6"
          tag="hr"
        />
        <RadiogroupElement
          name="existEmprestimo"
          :items="[
            {
              value: '1',
              label: 'Sim',
            },
            {
              value: '0',
              label: 'Não',
            },
          ]"
          label="Existem empréstimos/financiamentos?"
          size="md"
          :columns="{
            lg: {
              container: 6,
            },
          }"
        />
        <FileElement 
          name="anexoEmprestimos"
          label="Documento:"
          :urls="{}"
          :conditions="[
            [
              'existEmprestimo',
              '>=',
              '1',
            ],
          ]"
        />
        <StaticElement
          name="divider_5"
          tag="hr"
        />
        <RadiogroupElement
          name="existBeneficioFiscal"
          :items="[
            {
              value: '1',
              label: 'Sim',
            },
            {
              value: '0',
              label: 'Não',
            },
          ]"
          label="Existe algum benéficio fiscal?"
          size="md"
          :columns="{
            lg: {
              container: 6,
            },
          }"
        />
        <FileElement 
          name="anexoBeneficioFiscal"
          label="Documento:"
          :conditions="[
            [
              'existBeneficioFiscal',
              '>=',
              '1',
            ],
          ]"
          :urls="{}"
        />
        <StaticElement
          name="divider_4"
          tag="hr"
        />
        <RadiogroupElement 
          name="existBudget"
          :items="[
            {
              value: '1',
              label: 'Sim',
            },
            {
              value: '0',
              label: 'Não',
            },
          ]"
          label="Existem Budget, Business Plan e/ou Mapa Estratégico?"
          size="md"
          :columns="{
            lg: {
              container: 6,
            },
          }"
        />
        <FileElement 
          name="anexoBudget"
          label="Documento:"
          :conditions="[
            [
              'existBudget',
              '>=',
              '1',
            ],
          ]"
          :urls="{}"
        />
        <StaticElement
          name="divider_2"
          tag="hr"
        />
        <RadiogroupElement
          name="existImposto"
          :items="[
            {
              value: '1',
              label: 'Sim',
            },
            {
              value: '0',
              label: 'Não',
            },
          ]"
          label="Existem impostos atrasados?"
          size="md"
          :columns="{
            lg: {
              container: 6,
            },
          }"
        />
        <FileElement 
          name="anexoImpostos"
          label="Documento:"
          :conditions="[
            [
              'existImposto',
              '>=',
              '1',
            ],
          ]"
          :urls="{}"
        />
        <StaticElement
          name="tituloBalancoDRE"
          tag="h3"
          content="Balanço patrimonial e DRE"
        />
        <RadiogroupElement
          name="existDRE"
          :items="[
            {
              value: '1',
              label: 'Sim',
            },
            {
              value: '0',
              label: 'Não',
            },
          ]"
          label="Existem Balanço Patrimonial e DRE Gerencial?"
          size="md"
          :columns="{
            lg: {
              container: 6,
            },
          }"
          description="Se existirem, enviar Balanço Patrimonial e DRE Gerencial dos ultimos 5 anos."
        />
        <GroupElement
          name="container2_copy"
          :conditions="[
            [
              'existDRE',
              '>=',
              '1',
            ],
          ]"
        >
          <GroupElement
            name="column1"
            :columns="{
              default: {
              },
              lg: {
                container: 6,
              },
            }"
          >
            <MultifileElement 
              name="btUploadDemonstrativos"
              label="Demonstrativo do Resultado do Exercício:"
              description="DRE dos últimos 5 anos"
              accept="pdf"
            />
          </GroupElement>
          <GroupElement
            name="column2"
            :columns="{
              container: 6,
            }"
          >
            <MultifileElement 
              name="btUploadBalanco"
              label="Balanço Patrimonial:"
              description="Balanço Patrimonial dos últimos 5 anos"
              :urls="{}"
            />
          </GroupElement>
        </GroupElement>
        <StaticElement
          name="divider_3"
          tag="hr"
        />
        <RadiogroupElement
          name="existCapex"
          :items="[
            {
              value: '1',
              label: 'Sim',
            },
            {
              value: '0',
              label: 'Não',
            },
          ]"
          label="Existem desembolsos atuais ou plano de aquisição referente aos ativos imobilizados (Capex/Investimentos)?"
          size="md"
          :columns="{
            lg: {
              container: 6,
            },
          }"
        />
        <FileElement
          name="anexoCapexInvestimentos"
          :urls="{}"
          :conditions="[
            [
              'existCapex',
              '>=',
              '1',
            ],
          ]"
          label="Documento:"
          :soft-remove="true"
        />
        <StaticElement
          name="divider_1"
          tag="hr"
        />
        <StaticElement
          name="tituloContador"
          tag="h3"
          content="Contato do contador da empresa"
        />
        <TextElement
          name="nomeContador"
          label="Nome:"
          :columns="{
            container: 6,
          }"
        />
        <TextElement
          name="telefoneContador"
          label="Telefone:"
          :columns="{
            container: 6,
          }"
        />
      </FormElements>

      <FormStepsControls />
    </template>
  </Vueform>
</template>
<script>
import atividades from '../assets/atividades.json';
if (!localStorage.theme) {
    localStorage.theme = 'light';
  }
export default {
  data() {
    return {
      selectedAtividade1: null,
      selectedAtividade2: null,
      atividades: atividades,
      opcoesPrimeiroNivel: [],
          }
  },
  computed: {
        opcoesSegundoNivel() {
      if (this.selectedAtividade1) {
        return Object.keys(this.atividades[this.selectedAtividade1]) || [];
      } else {
        return [];
      }
    },
    opcoesTerceiroNivel() {
      if (this.selectedAtividade2) {
        let primeiroNivel = Object.keys(this.atividades).find(
          key => this.atividades[key][this.selectedAtividade2]
        );
        if (primeiroNivel) {
          return this.atividades[primeiroNivel][this.selectedAtividade2] || [];
        } else {
          return [];
        }
      } else {
        return [];
      }
    }
  },
  methods: {
    generateDynamicElementNames() {
      const dynamicElementNames = [];
      const currentYear = new Date().getFullYear();
      for (let i = 0; i < 5; i++) {
        const year = currentYear - i;
        dynamicElementNames.push('btUploadDemonstrativos' + year);
        dynamicElementNames.push('btUploadBalanco' + year);
      }
      return dynamicElementNames;
    },
    atualizarOpcoesSegundoNivel(valorSelecionado) {
      this.selectedAtividade1 = valorSelecionado;
    },
    atualizarOpcoesTerceiroNivel(valorSelecionado) {
      this.selectedAtividade2 = valorSelecionado;
    },
    obterOpcoesDoSegundoNivel(elementoDoPrimeiroNivel) {
      if (this.atividades[elementoDoPrimeiroNivel]) {
        return Object.keys(this.atividades[elementoDoPrimeiroNivel]);
      } else {
        return [];
      }
    }
  },
  mounted() {
    this.opcoesPrimeiroNivel = Object.keys(this.atividades);
  }
}
</script>