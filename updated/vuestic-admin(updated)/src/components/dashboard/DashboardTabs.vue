

<script>
import OverviewTab from './dashboard-tabs/OverviewTab'
import BillingAddressTab from './dashboard-tabs/BillingAddressTab'
import BankDetailsTab from './dashboard-tabs/BankDetailsTab'

export default {
  name: 'DashboardTabs',
  components: {
    OverviewTab,
    BillingAddressTab,
    BankDetailsTab,
  },
  data () {
    return {
      tabsState: 1,
      tabs: [
        'OverviewTab',
        'BillingAddressTab',
        'BankDetailsTab',
      ],
    }
  },
}
</script>
